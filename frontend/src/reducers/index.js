import { combineReducers } from 'redux'
import  login  from "./login"
import meals from "./meal"
import bank from "./bankdetails"
import ingredients from "./ingredients"
import foodgroup from "./foodgroup"
import foodtype from "./foodtype"
import nutrient from "./nutrients"
import mealcategory from "./mealcategories"
import cuisine from "./cuisine"
export default combineReducers({
  login,
  meals,
  bank,
  ingredients,
  foodgroup,
  foodtype,
  nutrient,
  cuisine,
  mealcategory
});


