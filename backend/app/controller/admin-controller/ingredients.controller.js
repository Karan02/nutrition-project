const Ingredients = require("../../model/ingredients.model");
const { findIngredients,updateIngredients,findIngredientsLimited,getLimitedIngredients } = require("../helper/db-queries/index")
const {handleEdit,handleAddIngredient} = require("../helper/admin-controller/ingredients/index.js")
const FoodGroup = require("../../model/food-group.model");
const FoodType = require("../../model/food-type.model");

/*
 @Input: New Ingredient data
 @params
 @Output: Status about the incoming Ingredient data 
*/
exports.create = async (req,res) => { 
  if(!req.body.isEdit) return await handleEdit(req,res); 
  const updateIngredients = await handleAddIngredient(req,res)
  res.json({
    status: true,
    ingredients: updateIngredients
  })  
}


exports.getSpecificIngredients = async (req,res) => {
  const search = req.query.search
  // const re = new RegExp(`^.*${search}.*$`)
  const re = new RegExp(`${search}`,"i")
  
  const offset = req.query.offset * 10 - 10;
  const array = await getLimitedIngredients(re,offset);
  const ingredients = array[0]
  const count = array[1][0] ? array[1][0].count:0
 
  if (ingredients.length < 1){
    res.json({
        status: false,
        message: 'No Ingredients found',
    });
    return;
  }
 
 
  // const ingredients = await findSpecificIngredientsByID(restaurantID,offset);

  
    res.json({
        status: true,
        data: ingredients,
        totalIngredients: count
    });
}


/*
 @Input: Restaurant ID
 @params
 @Output: All Ingredients of a particaular Restaurant
*/

exports.getAllIngredients = async (req,res) => {

  const offset = req.query.offset * 10 - 10;

  const ingredients = await  findIngredientsLimited({"isDeleted":false}, offset);
  const totalIngredients = await findIngredients({"isDeleted":false});
  
  // const totalIngredientsLength = totalIngredients.length(
  const totalIngredientsLength = await Ingredients.find().count();

  
  let array = []
  // let array = await Promise.all(ingredients.map(async ingredient => {
    for(let i = 0;i<ingredients.length;i++){
    let ingredient = ingredients[i]
    
    let foodgroup,foodtype 
    if(ingredient.foodGroup === "") ingredient.foodGroup = ""
    else {
      foodgroup = await FoodGroup.find({_id:ingredient.foodGroup})
      ingredient.foodGroup = foodgroup[0]  ? foodgroup[0].name:""
  }
  
    if(ingredient.foodType === "") ingredient.foodType = ""
    else{ 
      foodtype = await FoodType.find({_id:ingredient.foodType})
      ingredient.foodType = foodtype[0] ? foodtype[0].name: ""
    }
    // return ingredient
    array.push(ingredient)
  }
  // }))

  res.json({
    data: array,
    status: true,
    totalIngredients: totalIngredientsLength
  })
}

exports.deleteIngredient = async (req,res) => {
  const ingredientID = req.body.ingredientID
  await updateIngredients({_id:ingredientID},{$set:{"isDeleted":true}})
  res.json({
    status: true,
    message:" Ingredient Deleted successfully"
  })
}
