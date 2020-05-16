
var Promise = require('promise');
var moment = require('moment');
const {ObjectId} = require('mongodb');
const Meal = require('../model/meal.model');
const Ingredient = require('../model/ingredients.model');
const FoodGroup = require('../model/food-group.model');
const FoodType = require('../model/food-type.model');
const Restaurant = require('../model/restaurant.model');
const MealCategory = require('../model/meal-category.model');
var fs = require('fs');
const _ = require('lodash');
const {getallnutrientData} = require("../controller/helper/edamam/index")
const {findIngredients,findMeals,createMeal,createIngredient, getallMealsExport,findFoodGroup,createFoodGroup,findFoodType,createFoodType} = require("../controller/helper/db-queries")
const {getMealData,getIngredientsData,handleMealCategory,handleCuisines,handleIngredients,handleExportMeal} = require("../controller/helper/import-export");
// const {getNutrikarma,nutrientList} = require("../controller/helper/edamam");


function csvJSON(csv) {
  const lines = csv.split('\n')
  const result = []
  let headers = lines[0].split(',')
  
 
  const lastElement = headers[headers.length - 1]
  
  const whiteSpace = lastElement.charAt(lastElement.length - 1);
  if(whiteSpace.match(/^\s+$/)){

    
    headers[headers.length - 1] = lastElement.slice(0, -1);
  }
  
  for (let i = 1; i < lines.length; i++) {        
      if (!lines[i])
          continue
      const obj = {}
      const currentline = lines[i].split(',')
      
      for (let j = 0; j < headers.length; j++) {
       
          obj[headers[j]] = currentline[j].replace(/(\r\n|\n|\r)/gm, "");
          
         
      }
      result.push(obj)
      
  }
  
  return result
}

function handleImportMealFromJson(resultJson){
  let contains = 0
  let saveFile = resultJson
  saveFile.map(async (meal,index) =>{
   let unit = saveFile[index]["Units"]
   if(unit !== "Serving" && unit !== "cup" && unit !=="tablespoon" && unit !== "grams" &&
      unit !== "ounces" && unit !== "ML" && unit !== "Others"){
      saveFile[index]["Units"] = "Others"}
    const ingredients = {
      "ingredientsName" : saveFile[index]["Ingredients Name"],
      "quantity": saveFile[index]["Quantity"],
      "container": saveFile[index]["Units"],
      "foodGroup":saveFile[index]["Food Group"],
      "foodType":saveFile[index]["Food Type"],
      "toppings":saveFile[index]["Topping or Dressing (1=Yes)"]
    }
    
    if(saveFile[index]["Product Name"]){
  
    contains = index  
    delete saveFile[index]["Ingredients Name"];
    delete saveFile[index]["Quantity"];
    delete saveFile[index]["Units"];
    // saveFile[index]["mealName"] = saveFile[index]["Meal Name"]
    saveFile[index]["mealName"] = saveFile[index]["Product Name"]
    saveFile[index]["restaurantID"] = saveFile[index]["Restaurant Name"]
    saveFile[index]["cuisine"] = saveFile[index]["Cuisine"]
    saveFile[index].isDeleted = false
    // saveFile[index]["imageURL"] = saveFile[index]["Image Link"] 
    saveFile[index]["mealPrice"] = saveFile[index]["Price"] 
    saveFile[index]["mealSize"] = saveFile[index]["Product Size"]
    saveFile[index]["mealQuantity"] = saveFile[index]["Product Quantity"]
    saveFile[index]["mealCategory"] = saveFile[index]["Product Category"]
    // saveFile[index]["foodGroup"] = saveFile[index]["Food Group"]
    // saveFile[index]["foodType"] = saveFile[index]["Food Type"]
    // saveFile[index]["toppings"] = saveFile[index]["Topping or Dressing (1=Yes)"]

     
    delete saveFile[index]["Product Name"];
    delete saveFile[index]["Cuisine"];
    // delete saveFile[index]["Image Link"]; 
    delete saveFile[index]["Price"] 
    delete saveFile[index]["Product Size"]
    delete saveFile[index]["Product Quantity"]
    delete saveFile[index]["Product Category"]
    delete saveFile[index]["Food Type"]
    delete saveFile[index]["Food Group"]
    delete saveFile[index]["Topping or Dressing (1=Yes)"] 
    saveFile[index]["ingredients"] = []
    saveFile[index]["ingredients"].push(ingredients)
    
    return 
    }else{
      saveFile[contains].ingredients.push(ingredients)
      return
    }
  })
  
  
  const mealfilter = saveFile.map(meal => {
    if(meal.mealName){
      return meal
    }
    return
  })
  const mealfiltered = mealfilter.filter(element =>{
    return element !== undefined;
  })
  return mealfiltered
}

/*
 @Input: Meals Data
 @params
 @Output: Number of meals already exists
*/
let count = 0;
async function getIngredients(ingredients) {
  let ingredientsFromCsv = new Set();
  return Promise.all(await ingredients.map(async ingi => {
    const i = JSON.stringify(ingi);
    let ingredient = {}
    if (!ingredientsFromCsv.has(i)) {
      ingredientsFromCsv.add(i);
      // console.log('ingredient', count++)
      const item = JSON.parse(i);
      ingredient = await Ingredient.findOneAndUpdate({
        "ingredient": item.ingredientsName
      }, {
        $set: {
          "ingredient": item.ingredientsName, 
          "isDeleted": false, 
          "foodGroup": item.foodGroup, 
          "foodType": item.foodType
        }
      }, {
        new: true,
      });
      if (!ingredient) {
        ingredient = await Ingredient.insert({
          "ingredient": item.ingredientsName, 
          "isDeleted": false, 
          "foodGroup": item.foodGroup, 
          "foodType": item.foodType
        })
      }
    return ingredient;
  }}))
}

const handleImportMeal = (async (req, res) =>  {
  let resultJson
  var data = fs.readFileSync('uploads/file.csv','utf8')
  resultJson = csvJSON(data)
  const importedMeals = handleImportMealFromJson(resultJson);
  // console.log('importedMeals');
  const meals = await getallMealsExport();
  let ingredients = await Ingredient.find();
  const restaurants = await Restaurant.find();
  const foodGroups = await FoodGroup.find();
  const foodTypes = await FoodType.find();
  const mealCategories = await MealCategory.find();
  let ingredientNames = [];
  ingredients.map(item => {
    ingredientNames.push(item.ingredient);
  });
  const mealCategoryNames = mealCategories.map(item => {
    return item.name;
  });
  const restaurantNames = restaurants.map(item => {
    return item.name;
  });
  const mealNames = meals.map(item => {
    // console.log(item.mealName);
    return item.mealName;
  });
  let foodGroupNames = foodGroups.map(item => {
    return item.name;
  });
  let foodTypeNames = foodTypes.map(item => {
    return item.name;
  });
  let restaurantId, mealCategory;
  async function returnIngredients(ingredientsList) {
      const data = []
      for(let i = 0; i < ingredientsList.length; i++) {
      const ingredientItem = ingredientsList[i];
      if(!ingredientNames.includes(ingredientItem.ingredientsName)) {
        ingredientNames.push(ingredientItem.ingredientsName)
        if (!foodGroupNames.includes(ingredientItem.foodGroup)) {
          const foodGroup = await FoodGroup.create({
            name: ingredientItem.foodGroup,
            isDeleted: false,
          });
          foodGroupNames.push(ingredientItem.foodGroup);
          foodGroups.push(foodGroup);
          ingredientItem.foodGroup = foodGroup._id;
        } else {
          ingredientItem.foodGroup = foodGroups[foodGroupNames.indexOf(ingredientItem.foodGroup)]._id;
        }
        if (!foodTypeNames.includes(ingredientItem.foodType)) {
          const foodType = await FoodType.create({
            name: ingredientItem.foodType,
            isDeleted: false,
            group:ingredientItem.foodGroup
          });
          foodTypeNames.push(ingredientItem.foodType);
          foodTypes.push(foodType);
          ingredientItem.foodType = foodType._id;
        } else {
          // console.log(foodTypes)
          ingredientItem.foodType = foodTypes[foodTypeNames.indexOf(ingredientItem.foodType)]._id;
        }
        const ingredient = await Ingredient.create({
          ingredient: ingredientItem.ingredientsName,
          foodGroup: ingredientItem.foodGroup,
          foodType: ingredientItem.foodType,
          isDeleted: false,
        });
        ingredients.push(ingredient)
        data.push({
          selectedIngredientId: ingredient._id,
          quantity: 1,
          container: 'Serving',
          ingredientsName: ingredientItem.ingredientsName,
        })
        continue;
      } else {
        data.push({
          selectedIngredientId: ingredients[ingredientNames.indexOf(ingredientItem.ingredientsName)]._id,
          // selectedIngredientId: 1,
          quantity: 1,
          container: 'Serving',
          ingredientsName: ingredientItem.ingredientsName,
        })
      }}
    return data;
  }

  for (let i = 0; i<importedMeals.length; i++) {
    const item = importedMeals[i];
    if(mealNames.includes(item.mealName) && restaurantNames.includes(item.restaurantID)) {
      // console.log('inside if')
      const singleMealIngredientNames = meals[mealNames.indexOf(item.mealName)].ingredients.map(item => {
        return item.ingredientsName;
      })
      const checkToChangeIngredients = item.ingredients.filter(ingri => {
        return !singleMealIngredientNames.includes(ingri.ingredientsName);
      })
      if(checkToChangeIngredients.length > 0) {
        const updatedMealIngredients = await returnIngredients(item.ingredients);
        await Meal.update(
          {"mealName": item.mealName, "restaurantID": meals[mealNames.indexOf(item.mealName)].restaurant[0]._id}, 
          {$set: {"mealPrice": item.mealPrice, "ingredients": updatedMealIngredients,}},
          {upsert: true}
        )
      }
    } else {
      // console.log('inside else');
      if(!restaurantNames.includes(item.restaurantID)) {
        // console.log('restaurant does not exists');
        const restaurant = await Restaurant.create({
          name: item.restaurantID,
          isLoggedIn: false,
          role: 'RestaurantAdmin'
        });
        restaurantNames.push(item.restaurantID);
        restaurants.push(restaurant);
        restaurantId = restaurant._id;
      } else {
        // console.log(restaurants);
        restaurantId = restaurants[restaurantNames.indexOf(item.restaurantID)]._id;
      }
      const updatedMealIngredients = await returnIngredients(item.ingredients);
      if(!mealCategoryNames.includes(item.mealCategory)) {
        const newMealCategory = await MealCategory.create({
          name: item.mealCategory,
          isDeleted: false
        });
        mealCategory = newMealCategory._id;
        mealCategories.push(newMealCategory);
        mealCategoryNames.push(item.mealCategory);
      } else {
        mealCategory = mealCategories[mealCategoryNames.indexOf(item.mealCategory)]._id;
      }
      
      await Meal.create({
        mealName: item.mealName,
        restaurantID: restaurantId,
        mealPrice: item.mealPrice,
        ingredients: updatedMealIngredients,
        nutrient:{},
        mealCategory: mealCategory,
        isDeleted:false
      });
    }
  }
});


/*
 @Input: Meals Data
 @params
 @Output: Number of meals already exists
*/

exports.import = async (req,res) => {
  const count = await handleImportMeal(req, res)
  // await Meal.updateMany(req.body.meals);
  // console.log('near end');
  res.json({
    status: true,
    count:Math.max.apply(this,[null, count])
  })
  getallnutrientData();

  
}


/*
 @Input: Imported Ingredients
 @params
 @Output: Number of Ingredients already exist
*/
const handleImportIngredient = async req => {
  const importedIngredients = req.body.ingredients;
  let count = 0;
  
  // return Promise.all(importedIngredients.map(async ingredient =>{
    for(let i = 0;i<importedIngredients.length;i++){
    let ingredient = importedIngredients[i]
    ingredient.restaurantID = ObjectId(req.body.restaurantID)
    ingredient.isDeleted = false
    ingredient.toppings = ingredient.toppings === "true" ? true:false
    if(ingredient.foodGroup !== ""){
      let foodGroupexist = await findFoodGroup({name:ingredient.foodGroup,isDeleted:false})
      if(foodGroupexist.length > 0){
        ingredient.foodGroup = foodGroupexist[0]._id
      }else{
        let newfoodgroup = await createFoodGroup({name:ingredient.foodGroup,isDeleted:false})
        ingredient.foodGroup = newfoodgroup._id
      }
    }
    if(ingredient.foodType !== ""){
      let foodTypeexist = await findFoodType({name:ingredient.foodType,group:ingredient.foodGroup,isDeleted:false})
      if(foodTypeexist.length > 0){
        ingredient.foodType = foodTypeexist[0]._id
      }else{
        let newfoodtype = await createFoodType({name:ingredient.foodType,isDeleted:false,group:ingredient.foodGroup})
        ingredient.foodType = newfoodtype._id
      }
    }
    const totalIngredients = await findIngredients({ingredient:ingredient.ingredient, isDeleted: false});
      if(totalIngredients.length > 0) {
        count=count+1
      }
      else {
      
        await createIngredient(ingredient)
      }
    
    }
  // }));
  return count
}

/*
 @Input: Imported Ingredients
 @params
 @Output: Number of Ingredients already exist
*/

exports.importIngredient = async (req,res) => {
  
  console.log(req.body)
  
  let count = await handleImportIngredient(req)

  return res.json({
    status: true,
    count:count
  })

}

/*
 @Input: Restaurant ID
 @params
 @Output: All meals of a restaurant
*/

exports.export = async (req,res) => {
  const ownerId = req.params.restaurantId;
  const allMeals = await getallMealsExport();
  
  const allMealsFiltered = await handleExportMeal(allMeals)
  
  res.json({
    status: true,
    data: JSON.stringify(allMealsFiltered)
  });
}


/*
 @Input: 
 @params
 @Output: sample meals
*/

exports.sample = async (req,res) => {
  const data = getMealData(); 
  res.json({
    status: true,
    data: JSON.stringify(data)
  })
}

/*
 @Input: 
 @params
 @Output: sample Ingredients
*/
exports.sampleIngredient = async (req,res) => {
  const data = getIngredientsData();
  res.json({
    status: true,
    data: JSON.stringify(data)
  })
}

/*
 @Input: Restaurant ID
 @params
 @Output: all Ingredients of a particular restaurant
*/

exports.exportIngredient = async (req,res) => {

  const ownerId = req.params.restaurantId;
  
  const allIngredients = await findIngredients({isDeleted:false});
  
  // const filteredIngredients = []
  const filteredIngredients = allIngredients.map(Ingredient =>{
  
    const filterIngredient = {
      "INGREDIENT":Ingredient.ingredient,
      "FOOD GROUP":Ingredient.foodGroup ? Ingredient.foodGroup: '',
      "FOOD TYPE":Ingredient.foodType ? Ingredient.foodType: '',
      "TOPPINGS":Ingredient.toppings ? Ingredient.toppings:false,
      "1 SERVING GRAMS":Ingredient.servingsgrams,
      "1 CUP GRAMS":Ingredient.cupsgrams
      // "1 SERVING SIZE (# OF CUPS)":Ingredient.cups,
      // "1 SERVING SIZE (# OF TBSP)":Ingredient.tablespoons,
      // "GRAMS / CUP": Ingredient.gramPerCup ,
      // "GRAMS / TBSP":Ingredient.gramPerTbsp,
      // "1 SERVING SIZE (GRAMS)":Ingredient.servingSize,
      // "1 SERVING (OUNCES)":Ingredient.servingOunces,
      // "1 SERVING (ML)":Ingredient.servingMl,
    } 
    // filteredIngredients.push(Ingredient);
    return filterIngredient;
  })
  res.json({
    status: true,
    data: JSON.stringify(filteredIngredients)
  });
}