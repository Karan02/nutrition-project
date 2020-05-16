const MealCategory = require("../../../model/meal-category.model")
const {findMealCategories,createMealCategory,findCuisines,createCuisine,findIngredients,createIngredient,createFoodGroup,findFoodGroup,findFoodType,createFoodType} = require("../db-queries")
const {ObjectId} = require('mongodb');
const Ingredient = require('../../../model/ingredients.model');
const Cuisine = require("../../../model/cuisine.model");
const FoodGroup = require("../../../model/food-group.model");
const FoodType = require("../../../model/food-type.model");
// const MealCategory = require("../../../model/meal-category.model");

/*
 @Input: 
 @params
 @Output: Meal sample data 
*/
exports.getMealData = () => {

  const data = [
    {
     "Product Name" : "Picante Salad",
     "Restaurant Name":"Empanda Mama",
     "Product Category":"Salads",
     "Product Size":"medium",
     "Price":12, 
     "Restaurant Name":"Empanada",
     "Product Quantity":"12 ounces",
     "Cuisine":"Veg",
     "" : [ 
       {
           "Ingredients Name" : "Bread",
           "Quantity" : "500",
           "Units" : "grams",
           "Food Group":"Vegetable",
           "Food Type":"Raw leafy vegetable",
       }, 
       {
           "Ingredients Name" : "Onions",
           "Quantity" : "200",
           "Units" : "grams",
           "Food Group":"Vegetable",
           "Food Type":"Raw leafy vegetable",
       }, 
       {
           "Ingredients Name" : "Potato",
           "Quantity" : "400",
           "Units" : "grams",
           "Food Group":"Vegetable",
           "Food Type":"Raw leafy vegetable",
       }, 
       {
           "Ingredients Name" : "Tomato",
           "Quantity" : "100",
           "Units" : "grams",
           "Food Group":"Vegetable",
           "Food Type":"Raw leafy vegetable",
       }
     ],
     "Topping or Dressing (1=Yes)":"1"
    //  "Image Link" : "https://dummyimage.com/60x60/23facf/13174a",
    }
  ]
  return data
}


/*
 @Input: 
 @params
 @Output: Ingredients sample data 
*/

exports.getIngredientsData = () =>{
  const data = [
    {
      "INGREDIENT":"Spinach",
      "FOOD GROUP":"Vegetable",
      "FOOD TYPE":"raw leafy vegetable",
      "TOPPINGS":false,
      "1 SERVING GRAMS":1,
      "1 CUP GRAMS":2,
      // "1 SERVING SIZE (# OF CUPS)":"1",
      // "1 SERVING SIZE (# OF TBSP)":"",
      // "GRAMS / CUP": "30.43",
      // "GRAMS / TBSP":"",
      // "1 SERVING SIZE (GRAMS)":"30.43",
      // "1 SERVING (OUNCES)":"",
      // "1 SERVING (ML)":"",
    }
    , 
    {
        "INGREDIENT":"cashew dressing",
        "FOOD GROUP":"Other",
        "FOOD TYPE":"",
        "TOPPINGS":true,
        "1 SERVING GRAMS":4,
        "1 CUP GRAMS":5,
        // "1 SERVING SIZE (# OF CUPS)":"",
        // "1 SERVING SIZE (# OF TBSP)":"2.00",
        // "GRAMS / CUP": "" ,
        // "GRAMS / TBSP":"15.00",
        // "1 SERVING SIZE (GRAMS)":"30.00",
        // "1 SERVING (OUNCES)":"",
        // "1 SERVING (ML)":"",
      }
  ]
  return data
}


/*
 @Input: Particular meal category 
 @params
 @Output: meal category with _id  
*/
exports.handleMealCategory = async (mealCategory) => {
  const category = await findMealCategories({"name":mealCategory})
  const categorycount = category.length
  if(categorycount === 0){
    const mealcategory = {
      name: mealCategory,
      isDeleted: false
    }
    const eachCategory= await createMealCategory(mealcategory)
    const newCategory  = {
      mealType: eachCategory.name,
      selectedCategoryID:  ObjectId(eachCategory._id)
    }
    return newCategory
  }else if(categorycount > 0){
  const mealcategory = await findMealCategories({"name":mealCategory})
  const existingCategory = {
    mealType: mealcategory[0].name,
    selectedCategoryID: mealcategory[0]._id
  }
  return existingCategory
  }
}

/*
 @Input:  Particular meal cuisine
 @params
 @Output: meal cuisine with _id 
*/
exports.handleCuisines = async (mealCuisine) => {

  const Cuisine = await findCuisines({"name":mealCuisine})
  const cuisinecount = Cuisine.length
  
  if(cuisinecount === 0){
    const cuisine ={
      name: mealCuisine,
      isDeleted:false
    }
    const eachCuisine = await createCuisine(cuisine)

    const newCuisine = {
        "selectedCuisine" : eachCuisine.name,
        "selectedCuisineID" : eachCuisine._id
    
    }
    
    return newCuisine
  }else if(cuisinecount > 0){
  const cuisine = await findCuisines({"name":mealCuisine})
  
  const existingCuisine = {
    selectedCuisine: cuisine[0].name,
    selectedCuisineID: cuisine[0]._id
  }
  
   return existingCuisine
  }
}

/*
 @Input: meal
 @params
 @Output: Meal (with structured ingredients )
*/
exports.handleIngredients = async (req,eachmeal) => {
  let meal = eachmeal
  for(let number = 0;number < meal.ingredients.length;number++){
    
    let ingredient = meal.ingredients[number]
  const IngredientExist =await findIngredients({$and: [{ingredient: ingredient.ingredientsName},{
      restaurantID: (req.body.restaurantID)
  }]})
  if(IngredientExist.length > 0){
    
    meal.ingredients[number]["selectedIngredientId"] = IngredientExist[0]._id
    
   
    continue
  }
  await handleFoodGroup(ingredient);

  const ingredientIndividual = {
    "ingredient":ingredient.ingredientsName,
    "foodGroup":ingredient.foodGroup,
    "foodType":ingredient.foodType,
    "toppings":ingredient.toppings === "1" ? true:false,
    "isDeleted":false,
    "restaurantID":ObjectId(req.body.restaurantID)
  }
   
   const newIngredient = await createIngredient(ingredientIndividual) 

   meal.ingredients[number]["selectedIngredientId"] = newIngredient._id
   
}
return meal
}


/*
 @Input:  Ingredient
 @params
 @Output: null
*/
const handleFoodGroup = async (ingredient) =>{
  const foodGroupExist = await findFoodGroup({name: ingredient.foodGroup})
  let foodgroupvalue
  if(foodGroupExist.length === 0){
    foodgroupvalue = await createFoodGroup({
      "name":ingredient.foodGroup,
      "isDeleted":false
    })
  }else if(foodGroupExist.length > 0){
    foodgroupvalue = foodGroupExist[0]
  }
  await handleFoodType(ingredient,foodgroupvalue)
  return
}

/*
 @Input: ingredient
 @params
 @Output: null 
*/
const handleFoodType = async (ingredient,foodgroupvalue) =>{
  const foodTypeExist = await findFoodType({name:ingredient.foodType})
  
  let foodtypevalue
  if(foodTypeExist.length === 0){
    foodtypevalue = await createFoodType({
      "name":ingredient.foodType,
      "isDeleted":false,
      "group":{
        groupName:foodgroupvalue.name,
        groupID:foodgroupvalue._id
      }
    })
  }else if(foodTypeExist.length > 0){
    foodtypevalue = foodTypeExist[0]
  }
  return
}


/*
 @Input: all meals
 @params
 @Output: structured meals for export
*/

exports.handleExportMeal = async (allMeals) => {
  const ingredients = await Ingredient.find();
  const mealcategories = await MealCategory.find();
  const mealcuisines = await Cuisine.find();
  const foodgroups = await FoodGroup.find();
  const foodtypes = await FoodType.find();
  
  // console.log('inside', allMeals);
  let allMealsFiltered = []
  for(let index=0;index<allMeals.length;index++){  
    let meal = allMeals[index]
    delete meal._id
    delete meal.createdAt
    delete meal.editedAt
    delete meal.isDeleted
    let IngredientsArray = []
    
    for(let innerIndex=0;innerIndex<meal.ingredients.length;innerIndex++){  
      let ingredient = meal.ingredients[innerIndex]
      const selectedIngredientId = ingredient.selectedIngredientId
      let getfoodTypeGroup = []
      for(let i=0;i<ingredients.length;i++){
        const ingredient=ingredients[i]
        
        if(JSON.stringify(ingredient._id) == JSON.stringify(selectedIngredientId)){
          getfoodTypeGroup.push(ingredient)
        }
      }
     
      // const getfoodTypeGroup =await findIngredients({_id:selectedIngredientId})
      const getFoodGroup = getfoodTypeGroup[0] ? getfoodgroupname(foodgroups,getfoodTypeGroup[0].foodGroup)  : ''
      const getfoodType = getfoodTypeGroup[0] ? getfoodtypename(foodtypes,getfoodTypeGroup[0].foodType) : ''
      const getToppings = getfoodTypeGroup[0] ? "1":""
      let container = ingredient.container
      if(container === "Others") container = ingredient.ingredientsName
      IngredientsArray.push({      
        "Ingredients Name": ingredient.ingredientsName,
        "Food Type":getfoodType ? getfoodType: '',
        "Food Group": getFoodGroup ? getFoodGroup : '',
        "Quantity":ingredient.quantity,
        "Units":container,
        "Topping or Dressing (1=Yes)":getToppings
      })
    }
    const exportCategory = categories(mealcategories,meal.mealCategory)
    const exportCuisine = cuisines(mealcuisines,meal.mealCuisine)
    const mealFiltered = {
      "Product Name": meal.mealName,
      "Product Category":meal.mealCategory ? exportCategory : '',
      "Product Size":meal.mealSize ? meal.mealSize : '',
      "Price":meal.mealPrice, 
      "Restaurant Name":meal.restaurant[0] ? meal.restaurant[0].name : '',
      "Product Quantity":meal.mealQuantity ? meal.mealQuantity : '',
      "Cuisine":meal.mealCuisine ? exportCuisine: '',
      "": IngredientsArray,
    }
    allMealsFiltered.push(mealFiltered)
  }
  
  return allMealsFiltered
}

function categories(mealcategories,category){
  let name = ""
  for(let i = 0;i<mealcategories.length;i++){
    let loopedCategory = mealcategories[i]
    if(loopedCategory._id == category) {
      name = loopedCategory.name
      return name
    }
  }
 
  return name
}
function cuisines(mealcuisines,mealCuisine){
  let name = ""
  for(let i = 0;i<mealcuisines.length;i++){
    let loopedCuisine = mealcuisines[i]
    if(loopedCuisine._id == mealCuisine) {
      name = loopedCuisine.name
      return name
    }
  }
  return name
}

function getfoodgroupname(foodgroups,foodgroup) {
  let name = ""
  for(let i = 0;i<foodgroups.length;i++){
    let loopedGroup = foodgroups[i]
    // console.log("loopedGroup",loopedGroup)
    if(JSON.stringify(loopedGroup._id) == JSON.stringify(foodgroup)) {
      name = loopedGroup.name
      
    }
  }
  // console.log(" group name",name)
  return name
}

function getfoodtypename(foodtypes,foodtype) {
  let name = ""
  for(let i = 0;i<foodtypes.length;i++){
    let loopedType = foodtypes[i]
  
    if(JSON.stringify(loopedType._id) == JSON.stringify(foodtype)) {
      name = loopedType.name
    }
  }

  return name
}