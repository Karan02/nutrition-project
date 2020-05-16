const Meal =  require('../../model/meal.model');
const {ObjectId} = require('mongodb');

exports.import = async (req,res) => {
 
  
  const importedMeals = req.body.meals;
  
  await importedMeals.map(async meal=> {
    meal.restaurantID = ObjectId(meal.restaurantID);
    await Meal.create(meal)
  } )
  

  res.json({
    status: true
  })
}

exports.export = async (req,res) => {
  const ownerId = req.params.restaurantId;
  // console.log('params', ownerId)
  const allMeals = await Meal.find({restaurantID: ObjectId(ownerId)});
  
  res.json({
    status: true,
    data: JSON.stringify(allMeals)
  });
}

exports.sample = async (req,res) => {
 const data = [
   {
    "ingredients" : [ 
      {
          "ingredientsName" : "Bread",
          "quantity" : "500",
          "container" : "grams"
      }, 
      {
          "ingredientsName" : "Onions",
          "quantity" : "200",
          "container" : "grams"
      }, 
      {
          "ingredientsName" : "Potato",
          "quantity" : "400",
          "container" : "grams"
      }, 
      {
          "ingredientsName" : "Tomato",
          "quantity" : "100",
          "container" : "grams"
      }
    ],
    "mealName" : "Sugar",
    "restaurantID" : ObjectId("5e1731ca90c4a999ea6273ed"),
    "createdAt" : "2020-01-09T13:59:11.051Z",
    "editedAt" : "2020-01-09T13:59:11.051Z",
    "isDeleted" : false,
    "imageURL" : "https://dummyimage.com/60x60/23facf/13174a",
    "__v" : 0
   }
 ]
   
  res.json({
    status: true,
    data: JSON.stringify(data)
  })
}