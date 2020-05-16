const Meal =  require('../../model/meal.model');
const axios = require('axios');
const {ObjectId} = require('mongodb');

exports.getNutritionContent = async (req, res) => {
  
  const mealId = req.params.mealID;
  let meal;
  const allMeals = await Meal.find({_id: ObjectId(mealId)});

  allMeals.map(data => {
    const ingredientList = data.ingredients.map(ingre => {
      return `${ingre.quantity} ${ingre.container}, ${ingre.ingredientsName}`
    });
    return meal = {
      title: `${data.mealName}`,
      ingr: ingredientList
    }
  });
  
  const content = await axios.post(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`, meal);
  
  res.json({
    status:  true,
    data: content.data.totalNutrients
  })
}