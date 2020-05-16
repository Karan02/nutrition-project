const { findIngredients,createIngredient,updateIngredients,findFoodGroup,createFoodGroup,findFoodType } = require("../../db-queries/index")
/*
 @Input: Ingredients (for updating)
 @params
 @Output: status of input ingredients
*/
exports.handleEdit = async (req,res) => {
  
  if(!req.body.isEdit){
  
    const IngredientCheck = await findIngredients({
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
  delete req.body._id
  let foodtype = await findFoodType({name:req.body.foodType})
  req.body.foodGroup=foodtype[0].group
  req.body.foodType=foodtype[0]._id
  const ingredients = await createIngredient(req.body);

  

  return res.json({
    status: true,
    message: " Ingredient Added Successfully",
  })

  }
}

/*
 @Input: Ingredient (to be updated )
 @params
 @Output: updated Ingredient
*/

exports.handleAddIngredient = async (req,res) => {
 
  const IngredientCheck = await findIngredients({
    ingredient: req.body.ingredient  
  });

  if(req.body.ingredient.match(/^[0-9]+$/)) {
    return res.json({
      status: false,
      message: 'Invalid Ingredient Name!'
    })
  }  

  delete req.body.isEdit
  const ingredientID = req.body._id;
  const cupsgrams = parseFloat(req.body.cupsgrams);
  const servingsgrams = parseFloat(req.body.servingsgrams);
  // const cups = parseFloat(req.body.cups) || null;
  // const tablespoons = parseFloat(req.body.tablespoons) || null;
  // const gramPerCup = parseFloat(req.body.gramPerCup) || null;
  // const gramPerTbsp = parseFloat(req.body.gramPerTbsp) || null;
  // const servingSize = parseFloat(req.body.servingSize) || null;
  // const servingOunces = parseFloat(req.body.servingOunces) || null;
  // const servingMl = parseFloat(req.body.servingMl) || null;
 
  // let findFoodGroup = await findFoodGroup({name:req.body.foodGroup})
  // if(findFoodGroup.length == 0) findFoodGroup = await createFoodGroup({name:req.body.foodGroup,isDeleted:false})
  let foodtype = await findFoodType({name:req.body.foodType})
 
  const updateIngredient = await updateIngredients({_id:ingredientID},{
    $set:{
      "ingredient":req.body.ingredient,
      // "foodGroup":findFoodGroup.length ? findFoodGroup[0]._id:findFoodGroup._id,
      "foodGroup":foodtype[0].group,
      "foodType":foodtype[0]._id,
      "toppings":req.body.toppings,
      // "cups":cups,
      // "tablespoons":tablespoons,
      // "gramPerCup":gramPerCup,
      // "gramPerTbsp":gramPerTbsp,
      // "servingSize":servingSize,
      // "servingOunces":servingOunces,
      // "servingMl":servingMl,
      "cupsgrams":cupsgrams,
      "servingsgrams":servingsgrams,
      // "restaurantID":req.body.restaurantID
    }
  })
  return updateIngredient
}