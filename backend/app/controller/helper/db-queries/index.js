// const {ObjectId} = require('mongodb');

const Ingredients = require("../../../model/ingredients.model");
const Meal =  require('../../../model/meal.model');
const Cuisine = require('../../../model/cuisine.model');
const FoodGroup = require("../../../model/food-group.model");
const FoodType = require("../../../model/food-type.model");
const MealCategory = require("../../../model/meal-category.model");
const Restaurant = require('../../../model/restaurant.model');


/*
 @Input: query
 @params
 @Output: Ingredients
*/

exports.findIngredients = async (query) => {
  const ingredients = await Ingredients.find(query).sort({_id: -1});
  return ingredients
}

exports.findMealCategoriesLimited = async (offset) => {
  const categories = await MealCategory.aggregate([{$match:{isDeleted:false}},{ $sort:{_id:-1}},{ "$facet": {
    "totalData": [
      
      { "$skip": offset },
      { "$limit": 10 }
    ],
    "totalCount": [
      { "$group": {
        "_id": null,
        "count": { "$sum": 1 }
      }}
    ]
  }
}])
  return [categories[0].totalData,categories[0].totalCount]
}

exports.getIngredientsForMeal = async (limit) => {
  // console.log("limit",limit,"typeof",typeof limit)
  const ingredients = await Ingredients.find({isDeleted:false}).sort({_id: -1}).limit(parseInt(limit))
  return ingredients
}

exports.getLimitedIngredients = async (query, offset) => {
 
  const ingredients = await Ingredients.aggregate([{$sort:{_id:-1}},{$match:{isDeleted:false,ingredient:{$regex:query}}},{$lookup: {
    from: "foodtypes",
    localField: 'foodType',
    foreignField: '_id',
    as: 'abc'
  }}, {
            $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$abc", 0]}, "$$ROOT"]}}
        }, {$set: {foodType: "$name"}}
        ,{$project: {"name": 0}}
        , {$lookup: {
    from: "foodgroups",
    localField: 'foodGroup',
    foreignField: '_id',
    as: 'abc1'
  }}, {
            $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$abc1", 0]}, "$$ROOT"]}}
        }, {$set: {foodGroup: "$name"}},{ "$facet": {
          "totalData": [
            
            { "$skip": offset },
            { "$limit": 10 }
          ],
          "totalCount": [
            { "$group": {
              "_id": null,
              "count": { "$sum": 1 }
            }}
          ]
        }
      }
      ])

  
  return [ingredients[0].totalData,ingredients[0].totalCount]
}

/*
 @Input: query
 @params
 @Output: Ingredient
*/

exports.createIngredient = async (query) => {

  const ingredient = await Ingredients.create(query)
  return ingredient
}

/*
find meals with restaurant name
*/
exports.getallMealsExport= async (req,res) => {
  const allMeals = await Meal.aggregate([{$match:{isDeleted:false}},{ $sort:{_id:-1}},{$lookup: {
    from: "restaurants",
    localField: 'restaurantID',
    foreignField: '_id',
    as: 'restaurant'
  }},{
    $lookup:{
      from:"mealcategories",
      localField:"mealCategory",
      foreignField:"_id",
      as:"categoryArray"
    }
  },{
    $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$categoryArray", 0]}, "$$ROOT"]}}
},{$project: {"mealCategory": 0}},{$set: {mealCategory: "$name"}},{$project: {"name": 0}},
{
  $lookup:{
    from:"cuisines",
    localField:"mealCuisine",
    foreignField:"_id",
    as:"cuisineArray"
  }
},{
  $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$cuisineArray", 0]}, "$$ROOT"]}}
},{$project: {"mealCuisine": 0}},{$set: {mealCuisine: "$name"}},{$project: {"name": 0}}
])
  return allMeals
}

/*
 @Input: query
 @params
 @Output: meals
*/

exports.findMeals = async (query) => {
  
  const meals = await Meal.find(query).sort({_id: -1})
  
  return meals
}

exports.findIngredientsLimited = async (query,offset) => {
  
  const ingredients = await Ingredients.find(query).sort({_id: -1}).skip(offset).limit(10)
  return ingredients
}

/*
 @Input: query
 @params
 @Output: meal categories
*/

exports.findMealCategories = async (query) => {
  const category = await MealCategory.find(query).sort({_id: -1})
  
  return category
}

/*
 @Input: query
 @params
 @Output: meal category
*/

exports.createMealCategory = async (query) => {
  const category= await MealCategory.create(query)
  return category
}

/*
 @Input: query
 @params
 @Output: cuisines
*/

exports.findCuisines = async (query) => {
  const cuisines = await Cuisine.find(query).sort({_id: -1})
  return cuisines
}

/*
 @Input: query
 @params
 @Output: cuisine
*/

exports.createCuisine = async (query) => {
  const cuisine = await Cuisine.create(query)
  return cuisine
}

/*
 @Input: query
 @params
 @Output: food group
*/

exports.createFoodGroup = async (query) => {
  const foodgroup = await FoodGroup.create(query)
  return foodgroup
}
/*
 @Input: query
 @params
 @Output: food groups
*/
exports.findFoodGroup = async (query) => {
  const foodgroups = await FoodGroup.find(query).sort({_id: -1})
  return foodgroups
}
/*
 @Input: query
 @params
 @Output: foodtypes
*/
exports.findFoodType = async (query) => {
  const foodtypes = await FoodType.find(query).sort({_id: -1})
  return foodtypes
}
/*
 @Input: query
 @params
 @Output: food type
*/
exports.createFoodType = async (query) => {
  const foodtype = await FoodType.create(query)
  return foodtype
}
/*
 @Input: query
 @params
 @Output: meal
*/
exports.createMeal = async (query) => {
  
  const meal = await Meal.create(query)
  return meal
}

exports.insertMeal = async (query) => {
  
  const meal = await Meal.insertOne(query)
  return 
}
/*
 @Input: query
 @params
 @Output: cuisine
*/
exports.updateCuisine = async (query1,query2) => {
  const cuisine = await Cuisine.updateMany(query1,query2)
  return cuisine
}
/*
 @Input: query
 @params
 @Output: food group
*/
exports.updateFoodGroup = async (query1,query2) => {
  const foodgroup = await FoodGroup.updateMany(query1,query2)
  return foodgroup
}
/*
 @Input: query
 @params
 @Output: food type
*/
exports.updateFoodType = async (query1,query2) => {
  const foodtype = await FoodType.updateMany(query1,query2)
  return foodtype
}
/*
 @Input: query
 @params
 @Output: ingredient
*/
exports.updateIngredients = async (query1,query2) => {
  const ingredient = await Ingredients.updateOne(query1,query2)
  return ingredient
}
/*
 @Input: query
 @params
 @Output: meal category
*/
exports.updateMealCategories = async (query1,query2) => {
  const mealcategory = await MealCategory.updateOne(query1,query2)
  return mealcategory
}
/*
 @Input: query
 @params
 @Output: restaurants
*/
exports.findRestaurant = async (query) => {
  const restaurants =  await Restaurant.find(query).sort({_id: -1})
  return restaurants
}



/*
 @Input: query
 @params
 @Output: restaurant
*/
exports.updateRestaurant = async (query1,query2) => {
  const restaurant = await Restaurant.updateOne(query1,query2)
  return restaurant
}
/*
 @Input: query
 @params
 @Output: restaurant
*/
exports.createRestaurant = async (query) => {
  const restaurant = await Restaurant.create(query)
  return restaurant
}
/*
 @Input: query
 @params
 @Output: meal
*/
exports.updateMeal = async (query1,query2) => {
 
  const meal = await Meal.update(query1,query2)
  return meal
}
/*
 @Input: query
 @params
 @Output: meals (limit to 10, for pagination)
*/
exports.findMealsSpecial = async (offset) => {

  const allMeals = await Meal.aggregate([{ $sort:{_id:-1}},{$lookup: {
    from: "restaurants",
    localField: 'restaurantID',
    foreignField: '_id',
    as: 'restaurant'
  }},{
    $lookup:{
      from:"mealcategories",
      localField:"mealCategory",
      foreignField:"_id",
      as:"categoryArray"
    }
  },{
    $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$categoryArray", 0]}, "$$ROOT"]}}
},{$project: {"mealCategory": 0}},{$set: {mealCategory: "$name"}},{$project: {"name": 0,"categoryArray":0}},
{
  $lookup:{
    from:"cuisines",
    localField:"mealCuisine",
    foreignField:"_id",
    as:"cuisineArray"
  }
},{
  $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$cuisineArray", 0]}, "$$ROOT"]}}
},{$project: {"mealCuisine": 0}},{$set: {mealCuisine: "$name"}},{$project: {"name": 0,"cuisineArray":0}},
  {$skip: offset},{$limit: 10}])
 
  return allMeals
}

// exports.findSpecificIngredientsByID = async(restaurantID,offset) => {}


exports.findSpecificMealsByID = async (restaurantID,offset) => {

 
  const allMeals = await Meal.aggregate([{ $sort:{_id:-1}},{$lookup: {
    from: "restaurants",
    localField: 'restaurantID',
    foreignField: '_id',
    as: 'restaurant'
    }
    },
    {
      $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$restaurant", 0]}, "$$ROOT"]}}
    },{ "$match": {restaurantID: { $in: restaurantID }}},{$project: {"name": 0}},{
      $lookup:{
        from:"mealcategories",
        localField:"mealCategory",
        foreignField:"_id",
        as:"categoryArray"
      }
    },{
      $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$categoryArray", 0]}, "$$ROOT"]}}
  },{$project: {"mealCategory": 0}},{$set: {mealCategory: "$name"}},{$project: {"name": 0,"categoryArray":0}},
  {
    $lookup:{
      from:"cuisines",
      localField:"mealCuisine",
      foreignField:"_id",
      as:"cuisineArray"
    }
  },{
    $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$cuisineArray", 0]}, "$$ROOT"]}}
  },{$project: {"mealCuisine": 0}},{$set: {mealCuisine: "$name"}},{$project: {"name": 0,"cuisineArray":0}},
  
  
    { "$facet": {
      "totalData": [
        
        { "$skip": offset },
        { "$limit": 10 }
      ],
      "totalCount": [
        { "$group": {
          "_id": null,
          "count": { "$sum": 1 }
        }}
      ]
    }}
    ])
    // console.log("allMeals",allMeals)
    console.log("all meals",allMeals)
  return [allMeals[0].totalData,allMeals[0].totalCount[0] ? allMeals[0].totalCount[0].count:0]

}

// exports.getallMealsExport= async (req,res) => {

//   const allMeals = await Meal.aggregate([{$lookup: {
//     from: "restaurants",
//     localField: 'restaurantID',
//     foreignField: '_id',
//     as: 'restaurant'
//   }}
//   ,{ "$match": {isDeleted: false}},
//   {
//     $lookup:{
//       from:"mealcategories",
//       localField:"mealCategory",
//       foreignField:"_id",
//       as:"categoryArray"
//     }
//   },{
//     $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$categoryArray", 0]}, "$$ROOT"]}}
// },{$project: {"mealCategory": 0}},{$set: {mealCategory: "$name"}},{$project: {"name": 0,"categoryArray":0}},
//     ])
    
//   return allMeals
// }