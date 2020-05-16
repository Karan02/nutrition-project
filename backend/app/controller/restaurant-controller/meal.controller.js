const Meal = require('../../model/meal.model');
// const Restaurant = require('../../model/restaurant.model');
// const {getNutrikarma} = require("../controller/helper/edamam");
const {handleEdit,handleUpdate} = require("../helper/meal");
const {updateMeal,findRestaurant,findMeals,findMealsSpecial,findSpecificMealsByID,getIngredientsForMeal} = require("../helper/db-queries");
// const {nutrientList} = require("./helper/edamam" )
const mongoose = require('mongoose');

/*
  @Input: Meal data
  @params
  @Output: Object of Meal
*/

exports.createMeal = async (req, res) => {

  if(!req.body.isEdit) return await handleEdit(req,res)

  if(req.body.mealName.match(/^[0-9]+$/)) {
    return res.json({
      status: false,
      message: 'Invalid Meal Name!'
    })
  }


  // const search = nutrientList(req.body.ingredients,req.body.mealName)
  
  // // const content = null
  // const content = await getNutrikarma(search)
  req.body.nutrient = []

    
  //Update Meal
  delete req.body.isEdit;
  const updatedMeal = await handleUpdate(req,res);
  
  
  res.json({ 
    status: true,
    data: updatedMeal
  })

}



exports.getMealIngredients = async(req,res) =>{
  const limit = req.query.limit
  const ingredients = await getIngredientsForMeal(limit)
  res.json({
    status:true,
    data:ingredients
  })
}


exports.getSpecificMeal = async (req,res) => {
  const search = req.query.search
  // const re = new RegExp(`^.*${search}.*$`)
  const re = new RegExp(`${search}`,"i")
  
  
  const restaurants = await findRestaurant({name:{$regex:re}});
 
  if (restaurants.length < 1){
    res.json({
        status: false,
        message: 'No meals found for this restaurant',
    });
    return;
  }
  const restaurantID = restaurants.map(restaurant => new mongoose.Types.ObjectId(restaurant._id))
  
  
  // const restaurantID = restaurants[0]._id;
  const offset = req.query.offset * 10 - 10;
  const meals = await findSpecificMealsByID(restaurantID,offset);

    // if (meals[0].length < 1) {
    //     res.json({
    //         status: false,
    //         message: 'No meals found for this restaurant',
    //     });
    //     return;
    // }
    res.json({
        status: true,
        data: meals[0],
        totalMeal: meals[1]
    });
}

/*
  @Input: None
  @params
  @Output: List of Meals
*/
exports.getAllMeals = async (req, res) => {
  const offset = req.query.offset * 10 - 10;
  
  // const totalMeallength = await findMeals({});

  // const totalMeal = totalMeallength.length
  const totalMeal = await Meal.find().count();
  const meals = await findMealsSpecial(offset);
  if(meals.length < 1) {
    return res.json({
      status: false,
      message: 'No Meals available'
    });
  }

  res.json({
    status: true,
    data: meals,
    totalMeal: totalMeal
  })
}

/*
  @Input: Meal Id
  @params
  @Output: Restauran of Meal
*/
exports.getResturantOfMeal = async (req, res) => {
  const meal = await findMeals({_id: req.params.id});
  
  if(meal.length < 1) {
    return res.json({
      status: false,
      message: 'This meal does not exist!'
    });
  }

  const restaurant = await findRestaurant({_id: meal.restaurantID});

  res.json({
    status: true,
    data: restaurant
  })
}

/*
  @Input: Meal Id
  @params
  @Output: Marked Meal Deleted
*/
exports.deleteMeal = async (req, res) => {
  const mealID= req.params.mealId;
  
  await updateMeal({_id: mealID },{$set: {isDeleted: true}});

  res.json({
    status: true,
    message: 'Meal Deleted!'
  })
}

const restaurantArea = (restaurantLocation, userLocation, radius) => {
  return (
    geolib.isPointWithinRadius(
      {latitude: userLocation.latitude, longitude: userLocation.longitude},
      {latitude: restaurantLocation.latitude, longitude: restaurantLocation.longitude},
      radius*1000
    )
  )
}