import { message } from "antd"
import { GET_BANK_DETAILS_FAILURE } from "./bankdetails";
import fetchUrl from "../fetchurl";
var jsonexport =  require("jsonexport");
var fileDownload = require('js-file-download');
export const GET_INGREDIENTS_LIST_REQUEST = "GET_INGREDIENTS_LIST_REQUEST"
export const GET_INGREDIENTS_LIST_SUCCESS = "GET_INGREDIENTS_LIST_SUCCESS"
export const GET_INGREDIENTS_LIST_FAILURE = "GET_INGREDIENTS_LIST_FAILURE"

export const SUBMIT_INGREDIENTS_LIST_REQUEST = "SUBMIT_INGREDIENTS_LIST_REQUEST"
export const SUBMIT_INGREDIENTS_LIST_SUCCESS = "SUBMIT_INGREDIENTS_LIST_SUCCESS"
export const SUBMIT_INGREDIENTS_LIST_FAILURE = "SUBMIT_INGREDIENTS_LIST_FAILURE"
export const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER"
export const SAVE_FILE = "SAVE_FILE"
export const SET_SEARCH = "SET_SEARCH"

export const searchIngredients = (number) => (dispatch,getState) => {
  const { token } = getState().login;
  let { pageNumber,search } = getState().ingredients;
  if(number === 1) pageNumber = 1;
  dispatch({type: GET_INGREDIENTS_LIST_REQUEST});
  return fetch(`${fetchUrl()}restaurant/ingredientsSearch?offset=${pageNumber}&search=${search}`,{
    method: "GET",
    headers: {
      "authorization": `${token}`
    }
  })
  .then(response => response.json())
  .then(json =>{
    if(json.status === true){
      const ingredients = json.data;
      const totalIngredients = json.totalIngredients;
      dispatch({type:GET_INGREDIENTS_LIST_SUCCESS,ingredients,totalIngredients});
    }  
    if(json.status === false){
      const value = "";
      dispatch({type:SET_SEARCH,value});
      message.error(json.message,7);
      dispatch({type: GET_INGREDIENTS_LIST_FAILURE});
    }
  })
  .catch(err => {
    message.error("Unable to get ingredients",7);
});
};

export const getIngredients = () => (dispatch,getState) => {
  
  const {token,restaurantID} = getState().login;
  const role = localStorage.getItem('role');
  const { pageNumber } = getState().ingredients
  dispatch({type:GET_INGREDIENTS_LIST_REQUEST,})
  return fetch(`${fetchUrl()}ingredients?offset=${pageNumber}`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json", "authorization": `${token}`
    },
    body:JSON.stringify({
        "role":role,
        "restaurantID":restaurantID
    })
  })
  .then(response => response.json())
  .then(json => {
     
      if(json.status === true){
        const ingredients = json.data
        const totalIngredients = json.totalIngredients
        dispatch({type: GET_INGREDIENTS_LIST_SUCCESS,ingredients,totalIngredients})
      }else if(json.status === false){
        message.error("Unable to fetch ingredients",7)
        dispatch({type: GET_INGREDIENTS_LIST_FAILURE})
      }
  }).catch(error => {
    message.error("Unable to fetch ingredients ",7)
    console.log("error",error)
  })
}

export const sample = (value) => (dispatch,getState) => {
  
  return fetch(`${fetchUrl()}download-sample-${value}`,{
    method:"GET",
  }).then(response => response.json())
  .then(json =>{
    
    jsonexport(JSON.parse(json.data),function(err, csv){
      if(err) return console.log(err);
      
      fileDownload(csv, `${value}-sample.csv`);
  })
  })
}

export const fileblob = (file) => (dispatch,getState) => {
  
  const read = new FileReader();

  read.readAsBinaryString(file.originFileObj);


  read.onloadend = function(){
    // console.log("result",read.result)
   
    const resultJson = csvJSON(read.result);
    // console.log("result",resultJson);
    
    dispatch({type: SAVE_FILE,resultJson});
  }
}

function csvJSON(csv) {
  const lines = csv.split('\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {        
      if (!lines[i])
          continue
      const obj = {}
      const currentline = lines[i].split(',')

      for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
      }
      result.push(obj)
  }
 
  return result
}

export const postFile = () => (dispatch,getState) => {
  const saveFile = getState().ingredients.saveFile
  const { restaurantID } = getState().login
  const Ingredients = []
 
  saveFile.map((ingredient,index) =>{
    Ingredients.push({
      "ingredient": ingredient["INGREDIENT"],
      "foodGroup": ingredient["FOOD GROUP"],
      "foodType": ingredient["FOOD TYPE"],
      "toppings": ingredient["TOPPINGS"],
      "servingsgrams":ingredient["1 SERVING GRAMS"],
      "cupsgrams":ingredient["1 CUP GRAMS"]
      // "cups": ingredient["1 SERVING SIZE (# OF CUPS)"],
      // "tablespoons": ingredient["1 SERVING SIZE (# OF TBSP)"],
      // "gramPerCup": ingredient["GRAMS / CUP"],
      // "gramPerTbsp":ingredient["GRAMS / TBSP"],
      // "servingSize": ingredient["1 SERVING SIZE (GRAMS)"],
      // "servingOunces": ingredient["1 SERVING (OUNCES)"],
      // "servingMl": ingredient["1 SERVING (ML)"]
    }
    )
  })
  return fetch(`${fetchUrl()}import-ingredients`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      "ingredients":Ingredients,
      "restaurantID":restaurantID
    })            
  }).then(response => response.json())
  .then(json => {
    
    if(json.count > 0){ 
      message.warning(`${json.count} ingredient/s already exist`)
    }
    if(json.status){
    
    dispatch(getIngredients())
    }
  }).catch(err => message.error(err,7))
}

export const handleDownload = () => (dispatch,getState) => {

  const { restaurantID,token } = getState().login;
  return fetch(`${fetchUrl()}export-ingredient/${restaurantID}`,{
    method:"POST",
  }).then(response => response.json())
  .then(json =>{
   
    jsonexport(JSON.parse(json.data),function(err, csv){
      if(err) return console.log(err);
      
      fileDownload(csv, 'Ingredients.csv');
  })
  })
}


export const submitIngredient = (IngredientObj,isEdit,_id) => (dispatch,getState) => {
  const {token,restaurantID} = getState().login;
  const role = localStorage.getItem('role');
  dispatch({type:SUBMIT_INGREDIENTS_LIST_REQUEST})
  // console.log("IngredientObj",IngredientObj)
  return fetch(`${fetchUrl()}ingredients/create`,{
    method:"POST",
    headers:{"Content-Type":"application/json","authorization": `${token}`},
    body: JSON.stringify({
      "ingredient": IngredientObj.ingredient,
      "foodGroup": IngredientObj.foodGroup,
      "foodType": IngredientObj.foodType.length === 0 ? "":IngredientObj.foodType,
      "toppings": IngredientObj.toppings,
      "servingsgrams":IngredientObj.servingsgrams,
      "cupsgrams":IngredientObj.cupsgrams,
      // "cups": IngredientObj.cups,
      // "tablespoons": IngredientObj.tablespoons,
      // "gramPerCup": IngredientObj.gramPerCup,
      // "gramPerTbsp":IngredientObj.gramPerTbsp,
      // "servingSize": IngredientObj.servingSize,
      // "servingOunces": IngredientObj.servingOunces,
      // "servingMl": IngredientObj.servingMl,
      "isEdit":isEdit,
      "_id":_id,
      "role":role,
      "restaurantID":restaurantID
    })
  }).then(response => response.json())
  .then(json => {
    if(json.status){
      dispatch(getIngredients());
      if(!isEdit) message.success(" Ingredient Added successfully",7)
      if(isEdit) message.success(" Ingredient Updated successfully",7)
      
    }else if(!json.status) message.error(json.message,7)

  })
  .catch(err => message.error("Unable to submit Ingredient, Please try again later",7))
}

export const deleteIngredient = (id) => (dispatch,getState) => {
  return fetch(`${fetchUrl()}ingredients/delete-ingredient`,{
    method: "PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      ingredientID:id
    })
  }).then(response => response.json())
  .then(json => {
    if(json.status){
      message.success(json.message,7)
      dispatch(getIngredients())
    }
  }).catch(err => message.error("Unable to delete Ingredient, Please try again later",7))
}

export const changePageNumber = (pageNumber) => (dispatch, getState) => {
  dispatch({type:UPDATE_PAGE_NUMBER, pageNumber});
  }


  export const setSearch = (value) => (dispatch,getState) => {
    dispatch({type:SET_SEARCH,value});
  };
  

const initialState = {
  ingredients: [],
  loading:{
    ingredients: false
  },
  saveFile:null,
  pageNumber:1,
  search:"",
  totalIngredients:0
}

function ingredients(state = initialState,action){
  switch(action.type){
    case GET_INGREDIENTS_LIST_REQUEST:
      return Object.assign({},state,{
          loading:{
          ingredients: true
        }
      })
    case GET_INGREDIENTS_LIST_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ingredients: false
        },
        ingredients:action.ingredients,
        totalIngredients:action.totalIngredients
      })
    case GET_INGREDIENTS_LIST_FAILURE:
        return Object.assign({},state,{
          loading:{
            ingredients:false
          }
        }) 
    case UPDATE_PAGE_NUMBER:
      return Object.assign({},state,{
        pageNumber:action.pageNumber
      })       
    case SAVE_FILE:
      return Object.assign({},state,{
        saveFile:action.resultJson
      })    
    case SET_SEARCH:
      return Object.assign({},state,{
        search:action.value
      });    
    default:
      return state  
  }
}
export default ingredients;