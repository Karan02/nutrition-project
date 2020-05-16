const axios = require('axios');
const Meal = require("../../../model/meal.model");
const fetch = require("cross-fetch");
/*
 @Input: search data(with units,container and ingredient name)
 @params
 @Output: nutrient content 
*/
// const getNutrikarma = async (search) => {
  
//   const content = await axios.post(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`, search).catch(err =>{
//   console.log("err",err)  
//   return {
//       data:{message:"No Nutriental values available"}
//     }
//   });  
  
//   return content
// }


const getNutrikarma = async (search) => {
  
  const info = await fetch(`http://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_ANALYSIS_ID}&app_key=${process.env.NUTRITION_ANALYSIS_KEY}`,{
  method:"POST",
  headers: {"Content-Type":"application/json"},
  body:JSON.stringify({
    title:search.title,
    ingr:search.ingr
  })}
  ).then(res =>res.json()).then(json => json).catch(err =>{
  return {
      data:{message:"No Nutriental values available"}
    }
  });  
  
  return info
}


/*
 @Input: ingredients and meal name
 @params
 @Output: search object
*/
const nutrientList = (ingredients,mealName) => {
  
  const nutrientList = ingredients.map(ingre => {
    if(ingre.container === "Others") return `${ingre.quantity}, ${ingre.ingredientsName}`
       return `${ingre.quantity} ${ingre.container}, ${ingre.ingredientsName}`
    });
   
  const search = {
    title: `${mealName}`,
    ingr: nutrientList
  }  
  return search
}


exports.getallnutrientData = async () => {
  // console.log("1")
  let count =0
  const allMeals = await Meal.find({})
  
  for(let i =0;i<allMeals.length;i++){
    let meal = allMeals[i]
  // allMeals.map(async meal => {
    count++
  if(!meal.nutrient || Object.keys(meal.nutrient ? meal.nutrient:[]).length === 0 ){
    console.log("count",count)
      const search = nutrientList(meal.ingredients,meal.mealName)
      
      const nutrient = await getNutrikarma(search)
     
      await Meal.updateOne({_id:meal._id},{$set:{
        nutrient: nutrient
      }})
      
    }
   
  // })
} 
}