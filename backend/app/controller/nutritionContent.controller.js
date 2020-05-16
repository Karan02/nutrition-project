
// THIS CODE IS UNUSED


const Meal =  require('../model/meal.model');
const axios = require('axios');
const {ObjectId} = require('mongodb');


/*
 @Input: Meal Data
 @params
 @Output: Nutrient Content 
*/
exports.getNutritionContent = async (req, res) => {
 
  const mealId = req.params.mealID;
  let meal;
  let filtered,calories;
  const allMeals = await Meal.find({_id: ObjectId(mealId)});
  meal = allMeals[0]
  
  if(!meal.nutrient && Object.keys(meal.nutrient ? meal.nutrient:[]).length === 0){
   
  const nutrientList = meal.ingredients.map(ingre => {
         return `${ingre.quantity} ${ingre.container}, ${ingre.ingredientsName}`
  });
  const search = {
      title: `${req.body.mealName}`,
      ingr: nutrientList
    }
  await axios.post(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`, search)
  .then(async result => {
    
    const content = result
    await Meal.updateOne({_id:mealId},{$set:{"nutrient":content.data}}); 
    let values = getCaloriesandnutrients(content.data);
    filtered = values[0];
    calories = values[1];
    res.json({
      status:  true,
      data: filtered,
      calories:calories
    })
  }).catch(async err => {
    
    await Meal.updateOne({_id:mealId},{$set:{"nutrient":{}}});
    res.json({
      data: null,
      calories: null,
      status: true  
    })
    // return
  // }
  })
  }else{
    
  let values = getCaloriesandnutrients(meal.nutrient); 
  filtered = values[0];
  calories = values[1];
  }
  
   

  // const content = await axios.post(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`, search);  
  // console.log("content",content)
  // await Meal.updateOne({_id:mealId},{$set:{"nutrient":content.data}}); 
  
  // let values = getCaloriesandnutrients(content.data);
  // filtered = values[0];
  // calories = values[1];
  // }else{
  // let values = getCaloriesandnutrients(meal.nutrient); 
  // filtered = values[0];
  // calories = values[1];
  // }
  
  res.json({
      status:  true,
      data: filtered,
      calories:calories
    })
}


const getCaloriesandnutrients = (nutrient) => {
  
  let content = nutrient
  
  const calories = content.calories
  
  const percentages = content.totalDaily
  let filtered = []
  
  for(var key of Object.keys(content.totalNutrients)){
    let value = content.totalNutrients[key]
    let percentage = `-`
    if(key in percentages){
      percentage = `${percentages[key].quantity.toFixed(2)} `+`%`
    }
    value.percentage = percentage
    
    value.weight = `${value.quantity.toFixed(2)} `+`${value.unit}`
    delete value.unit
    delete value.quantity
    filtered.push(value)
  }
  
  return [filtered,calories]

}

// exports.getNutritionContent2 = async (req, res) => {
//   // console.log("req",req.params)
  
//   const mealId = req.params.mealID;
//   let meal;
//   const allMeals = await Meal.find({_id: ObjectId(mealId)});
//   let content = allMeals[0].nutrient
 
//   const calories = content.calories
  
//   const percentages = content.totalDaily
//   // console.log("percentages",percentages)
//   let filtered = []
//   for(var key of Object.keys(content.totalNutrients)){
//     let value = content.totalNutrients[key]
//     // console.log("key",typeof key)
//     let percentage = `-`
//     if(key in percentages){
//       // console.log(percentages.key)
//       // console.log("percentages",percentages[key])
//       // console.log("percentages",percentages[key].quantity)
//       percentage = `${percentages[key].quantity.toFixed(2)} `+`%`
//     }
//     value.percentage = percentage
    
//     value.weight = `${value.quantity.toFixed(2)} `+`${value.unit}`
//     delete value.unit
//     delete value.quantity
//     filtered.push(value)
//   }
//   // req.body.ingredients.map(data => {
//   //   const ingredientList = data.ingredients.map(ingre => {
//   //     return `${ingre.quantity} ${ingre.container}, ${ingre.ingredientsName}`
//   //   });
//   //   return meal = {
//   //     title: `${data.mealName}`,
//   //     ingr: ingredientList
//   //   }
//   // });
 
//   // const content = await axios.post(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`, meal);
  
//   res.json({
//     status:  true,
//     data: filtered,
//     calories:calories
//   })
// }
