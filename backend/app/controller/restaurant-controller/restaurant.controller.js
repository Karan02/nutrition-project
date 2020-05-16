const randomString = require('random-string');
const bcrypt = require('bcrypt');
const {ObjectId} = require('mongodb');
const {handleEmailSend} = require("../helper/restaurant")
const {findRestaurant,createRestaurant,findMeals,findMealsSpecial} = require("../helper/db-queries")
/*
 @Input: Restaurant Data
 @params
 @Output: Object of Restaurant 
*/
exports.create = async (req, res) => {
  // console.log("hererer")
  if(!req.body.name || !req.body.email || !req.body.phone) {
    return res.json({
      status: false,
      message: 'Enter All Fields'
    })
  }

  req.body.email = req.body.email.toLowerCase().trim();
  const restaurantCheck = await findRestaurant({$or: [{email: req.body.email},{name: req.body.name}]})

  if(restaurantCheck.length > 0) {
    return res.json({
      status: false,
      message: 'Restaurant already exists'
    })
  }


  if(req.body.role === 'admin') {
    req.body.password= bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
    req.body.role = 'admin';
    await createRestaurant(req.body)
    return res.json({
      status: true,
      message: 'Admin Created'
    })
  }
  req.body.isLoggedIn = false;

  const getPassword = randomString({length: 10});
  console.log("getPassword",getPassword)
  req.body.password = bcrypt.hashSync(getPassword, 10);
  req.body.role= 'RestaurantAdmin'

  await createRestaurant(req.body);
  return await handleEmailSend(req,res,getPassword)
}


/*
  @Input: none
  @params
  @Output: List of restaurant
*/
exports.getRestaurant = async (req, res) => {

  const restaurants = await findRestaurant({});

  res.json({
    status: true
  })
}

/*
  @Input: Restaurent ID
  @params
  @Output: Restaurant Object
*/
exports.getRestaurantById = async (req, res) => {
  const restaurant = await findRestaurant({_id:ObjectId(req.params.id)})
    .catch((error) => {
      res.json({
        status: false,
        message: 'Restaurant not found'
      });
    })

    if(!restaurant) {
        res.json({
        status: false
       });
    }

	else {
		res.json({
			data:restaurant,
			status: true
		});
	}
}

/*
  @Input: Restaurant Id
  @params
  @Output: List of meals of a restaurant 
*/
exports.getAllMeals = async (req, res) => {

  
  
  const restaurant = await findRestaurant({_id: ObjectId(req.params.restaurantId)});
  const offset = req.query.offset * 10 - 10;

  if(!restaurant) {
    return res.json({
      status: false,
      message: 'Restaurant does not exists'
    });
  } else {
    
    const totalMeallength = await findMeals({restaurantID:ObjectId(req.params.restaurantId), isDeleted: false});
    const totalMeal = totalMeallength.length
    const allMeals = await findMealsSpecial({restaurantID: ObjectId(req.params.restaurantId), isDeleted: false},0);
   

    
    res.json({
    status: true,
    data: allMeals,
    totalMeal: totalMeal
  })
  }
}

