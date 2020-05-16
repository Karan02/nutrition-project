const {findRestaurant,findMeals,createMeal,updateMeal,createRestaurant,updateRestaurant,findMealCategories,findCuisines} = require("../db-queries")
// const {nutrientList,getNutrikarma}  = require("../edamam/index")
const moment = require('moment');
const {mongoose} = require("mongoose");
const {ObjectId} = require('mongodb');
const Meal = require("../../../model/meal.model")
/*
 @Input: New meal data
 @params
 @Output: Newly created meal
*/
exports.handleEdit = async (req,res) => {
  
  if(!req.body.isEdit) {
    if(!req.body) {
      return res.json({
        status: false,
        message: 'Enter All Fields'
      });
    } 
    
    let newRestaurant
    let updateRestaurantName
    if(req.body.restaurantName !== ""){
      const restaurantcheck = await findRestaurant({name:req.body.restaurantName})
      if(restaurantcheck.length === 0){
        newRestaurant = await createRestaurant({name:req.body.restaurantName})
      }else if(restaurantcheck.length > 0){
        await updateRestaurant({_id:req.body.restaurantNameID},{$set:{name:req.body.restaurantName}})
        updateRestaurantName = await findRestaurant({name:req.body.restaurantName})
      }
    }
    const restaurantID = newRestaurant ? newRestaurant._id:updateRestaurantName[0]._id;





    const ownerId = req.body.restaurantNameID !== "" ? req.body.restaurantNameID:restaurantID;
    
    // const restaurant = await findRestaurant({_id: ObjectId(ownerId)});
    
    // if(restaurant.length === 0) {
    //   return res.json({
    //     status: false,
    //     message: 'User not found'
    //   });
    // }
    
  
    const mealCheck = await findMeals({
      $and: [
        {
          restaurantID: ObjectId(ownerId)
        },
        {
          mealName: req.body.mealName
        },{
          isDeleted: false
        }
      ]
    });
  
    if(mealCheck.length > 0) {
      return res.json({
        status: false,
        message: 'Meal already exists'
      })
    }
  
    if(req.body.mealName.match(/^[0-9]+$/)) {
      return res.json({
        status: false,
        message: 'Invalid Meal Name!'
      })
    }
    
    req.body.restaurantID = ObjectId(ownerId);
    req.body.createdAt = moment().toISOString();
    req.body.editedAt= moment().toISOString()
    req.body.isDeleted = false;
    req.body.imageURL = "https://dummyimage.com/60x60/23facf/13174a";

    const category = await findMealCategories({name:req.body.mealCategory})
    req.body.mealCategory = category[0] ? category[0]._id:null

    const cuisine = await findCuisines({name:req.body.mealCuisine})
    req.body.mealCuisine = cuisine[0] ? cuisine[0]._id:null  
    // const search = nutrientList(req.body.ingredients,req.body.mealName)
  
    
    // const content = await getNutrikarma(search)

    
    delete req.body.restaurantName
    delete req.body.restaurantNameID
    
    const meal = await Meal.insertMany({
      mealCategory:req.body.mealCategory,
      mealCuisine:req.body.mealCuisine,
      imageURL: req.body.imageURL,
      isDeleted:req.body.isDeleted,
      editedAt:req.body.editedAt,
      createdAt:req.body.createdAt,
      restaurantID:req.body.restaurantID,
      ingredients:req.body.ingredients,
      mealSize:req.body.mealSize,
      mealPrice:req.body.mealPrice,
      mealQuantity:req.body.mealQuantity,
      mealName:req.body.mealName,
      nutrient:[]}, function(err, res){
        if(err) throw console.log("err",err);
      });
    
    return res.json({
      status: true,
      data: meal
    })

  }
  return
}


/*
 @Input: Meal data to be changed
 @params
 @Output: Updated Meal  
*/
exports.handleUpdate = async (req,res) => {
  const mealId = req.query.mealId;
  let newRestaurant
  let updateRestaurantName
 
  if(req.body.restaurantName !== ""){
    const restaurantcheck = await findRestaurant({name:req.body.restaurantName})
    
    if(restaurantcheck.length === 0){
      newRestaurant = await createRestaurant({name:req.body.restaurantName})
    }else if(restaurantcheck.length > 0){
    
      await updateRestaurant({_id:req.body.restaurantNameID},{$set:{name:req.body.restaurantName}})
      updateRestaurantName = await findRestaurant({name:req.body.restaurantName})
      // console.log("updateRestaurantName",updateRestaurantName)
    }
  }
  const category = await findMealCategories({name:req.body.mealCategory})
  req.body.mealCategory = category[0]._id
 
  const cuisine = await findCuisines({name:req.body.mealCuisine})
  req.body.mealCuisine = cuisine[0]._id  
 
  const restaurantID = newRestaurant ? newRestaurant._id:updateRestaurantName[0]._id;
 
  const updatedMeal = await updateMeal({_id: mealId},{$set: {
    mealName: req.body.mealName,
    ingredients: req.body.ingredients,
    mealCategory:req.body.mealCategory,
    mealCuisine:req.body.mealCuisine,
    mealSize:req.body.mealSize,
    mealPrice:req.body.mealPrice,
    mealQuantity:req.body.mealQuantity,
    nutrient:req.body.nutrient,
    restaurantID:restaurantID,
    editedAt: moment().toISOString()
  }});
  
  return updatedMeal
}