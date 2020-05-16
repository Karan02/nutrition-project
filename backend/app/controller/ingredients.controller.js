//THIS CODE IS UNUSE

const Ingredients = require("../model/ingredients.model");
const {getLimitedIngredients} = require('./helper/db-queries');


/*
 @Input: New Ingredient Data
 @params
 @Output: Updated Ingredients
*/
exports.create = async (req,res) => {
  
  if(!req.body.isEdit){
    const IngredientCheck = await Ingredients.find({
     ingredient: req.body.ingredient,isDeleted:false
    });
    
    if(IngredientCheck.length > 0) {
      return res.json({
        status: false,
        message: 'Ingredient already exists'
      })
    }
  
    if(req.body.ingredient.match(/^[0-9]+$/)) {
      return res.json({
        status: false,
        message: 'Invalid Ingredient Name!'
      })
    }  


  req.body.isDeleted = false;
  const ingredients = await Ingredients.create(req.body);

  res.json({
    status: true,
    message: "Added Ingredient Successfully",
  })

  }
  const IngredientCheck = await Ingredients.find({
    ingredient: req.body.ingredient  
  });

  if(IngredientCheck.length > 0) {
    return res.json({
      status: false,
      message: 'Ingredient already exists'
    })
  }

  if(req.body.ingredient.match(/^[0-9]+$/)) {
    return res.json({
      status: false,
      message: 'Invalid Ingredient Name!'
    })
  }  

  delete req.body.isEdit
  const ingredientID = req.body._id
  const updateIngredients = await Ingredients.updateOne({_id:ingredientID},{
    $set:{
      "ingredient":req.body.ingredient,
      "foodGroup":req.body.foodGroup,
      "foodType":req.body.foodType,
      "toppings":req.body.toppings,
      "cups":req.body.cups,
      "tablespoons":req.body.tablespoons,
      "gramPerCup":req.body.gramPerCup,
      "gramPerTbsp":req.body.gramPerTbsp,
      "servingSize":req.body.servingSize,
      "servingOunces":req.body.servingOunces,
      "servingMl":req.body.servingMl,
      "restaurantID":req.body.restaurantID
    }
  })

  res.json({
    status: true,
    ingredients: updateIngredients
  })

  
}
/*
 @Input: Restaurant ID
 @params
 @Output: Ingredients
*/
exports.getAllIngredients = async (req,res) => {
  const offset = req.query.offset * 10 - 10;
 
  const ingredients = await getLimitedIngredients({}, offset);
  
 
  res.json({
    data: array,
    status: true,
  })

}

/*
 @Input: Ingredient ID
 @params
 @Output: Status 
*/

exports.deleteIngredient = async (req,res) => {
  const ingredientID = req.body.ingredientID
  await Ingredients.updateOne({_id:ingredientID},{$set:{"isDeleted":true}})
  res.json({
    status: true,
    message:"Deleted Ingredient successfully"
  })
}