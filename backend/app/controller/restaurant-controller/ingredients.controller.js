const Ingredients = require("../../model/ingredients.model");

exports.create = async (req,res) => {
  
  if(!req.body.isEdit){
    
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

exports.getAllIngredients = async (req,res) => {
 
  const ingredients = await  Ingredients.find({"restaurantID":req.body.restaurantID});
  
  res.json({
    data: ingredients,
    status: true
  })

}

exports.deleteIngredient = async (req,res) => {
  const ingredientID = req.body.ingredientID
  await Ingredients.updateOne({_id:ingredientID},{$set:{"isDeleted":true}})
  res.json({
    status: true,
    message:"Deleted Ingredient successfully"
  })
}