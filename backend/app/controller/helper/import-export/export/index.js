const {findIngredients} = require("../../db-queries")

/*
 @Input: all meals
 @params
 @Output: structured meals for export
*/

exports.handleExportMeal = async (allMeals) => {
  let allMealsFiltered = []
  
  for(let index=0;index<allMeals.length;index++){  
    let meal = allMeals[index]
    
    delete meal._id
    delete meal.createdAt
    delete meal.editedAt
    delete meal.restaurantID
    delete meal.isDeleted
    let IngredientsArray = []
    // const IngredientsArray =  meal.ingredients.map(async ingredient =>{
    for(let innerIndex=0;innerIndex<meal.ingredients.length;innerIndex++){  
      let ingredient = meal.ingredients[innerIndex]
      const selectedIngredientId = ingredient.selectedIngredientId
      const getfoodTypeGroup =await findIngredients({_id:selectedIngredientId})
      const getFoodGroup = getfoodTypeGroup[0].foodGroup 
      const getfoodType = getfoodTypeGroup[0].foodType
      const getToppings = getfoodTypeGroup[0].toppings ? "1":""
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
    // )
   
   
    const mealFiltered = {
      "Product Name": meal.mealName,
      "Restaurant Name":meal.restaurant ? (meal.restaurant[0].length > 0 ?  meal.restaurant[0].name:""):"",
      "Product Category":meal.mealCategory ? meal.mealCategory.mealType : '',
      "Product Size":meal.mealSize ? meal.mealSize : '',
      "Price":meal.mealPrice, 
      "Product Quantity":meal.mealQuantity ? meal.mealQuantity : '',
      "Cuisine":meal.mealCuisine ? meal.mealCuisine.selectedCuisine : '',
      "": IngredientsArray
    }
    allMealsFiltered.push(mealFiltered)
    
    // return mealFiltered
  }

  return allMealsFiltered
}