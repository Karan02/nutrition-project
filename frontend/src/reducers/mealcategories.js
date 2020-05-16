import styled from "@emotion/styled";
import { message } from "antd"
import fetchUrl from "../fetchurl";
export const GET_MEAL_CATEGORIES_REQUEST = "GET_MEAL_CATEGORIES_REQUEST"
export const GET_MEAL_CATEGORIES_SUCCESS = "GET_MEAL_CATEGORIES_SUCCESS"
export const GET_MEAL_CATEGORIES_FAILURE = "GET_MEAL_CATEGORIES_FAILURE"

export const SUBMIT_MEAL_CATEGORIES_REQUEST = "SUBMIT_MEAL_CATEGORIES_REQUEST"
export const SUBMIT_MEAL_CATEGORIES_SUCCESS = "SUBMIT_MEAL_CATEGORIES_SUCCESS"
export const SUBMIT_MEAL_CATEGORIES_FAILURE = "SUBMIT_MEAL_CATEGORIES_FAILURE"

export const DELETE_MEAL_CATEGORIES = "DELETE_MEAL_CATEGORIES"

export const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER"

// export const getIngredients = () => (dispatch,getState) => {
  
//   const {token,restaurantID} = getState().login;
//   const role = localStorage.getItem('role');
//   const { pageNumber } = getState().mealcategory
//   dispatch({type:GET_INGREDIENTS_LIST_REQUEST,})
//   return fetch(`${fetchUrl()}ingredients?offset=${pageNumber}`,{
//     method: "POST",
//     headers:{
//       "Content-Type": "application/json", "authorization": `${token}`
//     },
//     body:JSON.stringify({
//         "role":role,
//         "restaurantID":restaurantID
//     })
//   })
//   .then(response => response.json())
//   .then(json => {
     
//       if(json.status === true){
//         const ingredients = json.data
//         const totalIngredients = json.totalIngredients
//         dispatch({type: GET_INGREDIENTS_LIST_SUCCESS,ingredients,totalIngredients})
//       }else if(json.status === false){
//         message.error("Unable to fetch ingredients")
//         dispatch({type: GET_INGREDIENTS_LIST_FAILURE})
//       }
//   }).catch(error => {
//     message.error("Unable to fetch ingredients ")
//     console.log("error",error)
//   })
// }
export const getMealCategories = () => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  const { pageNumber } = getState().mealcategory
  console.log("page number",pageNumber)
  dispatch({type: GET_MEAL_CATEGORIES_REQUEST})
  return fetch(`${fetchUrl()}meal-category?offset=${pageNumber}`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "authorization": `${token}`
    },
    body:JSON.stringify({
      "role":role
    })
  }).then(response => response.json())
  .then(json => {
    if(json.status === true){
      const mealCategory = json.data;
      const totalCategories = json.totalCategories;
      console.log("totalCategories",totalCategories)
      dispatch({type:GET_MEAL_CATEGORIES_SUCCESS,mealCategory,totalCategories})}
    else if(json.status == false){
      message.error("unable to get meal categories",7)
      dispatch({type:GET_MEAL_CATEGORIES_FAILURE})
    }
  }).catch(err => message.error("Unable to get meal categories, please try later",7))
}


export const submitMealCategories = (name,isEdit,id) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  dispatch({type:SUBMIT_MEAL_CATEGORIES_REQUEST})
  return fetch(`${fetchUrl()}meal-category/create`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "authorization": `${token}`
    },
    body:JSON.stringify({
      "name":name,
      "isEdit":isEdit,
      "_id":id,
      "role":"admin"
    })
  })
  .then(response => response.json())
  .then(json => {
    
    if(json.status === false) {
      message.error(json.message,7); 
      dispatch({type:SUBMIT_MEAL_CATEGORIES_SUCCESS})
      dispatch(getMealCategories());
    }
    else {
      if(!isEdit) message.success("meal categories added successfully",7)
      if(isEdit) message.success("meal categories updated successfully",7)
      
      dispatch({type:SUBMIT_MEAL_CATEGORIES_FAILURE})
      dispatch(getMealCategories());
    }
  }).catch(err => {
  
    message.error("Some error occured while submitting, please try later",7)
  })
}
export const deleteMealCategories = (selectedRow) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  return fetch(`${fetchUrl()}mealCategory/delete-meal-category?categoryID=${selectedRow._id}`,{
    method: "PUT",
    headers: {"Content-Type": "application/json",
    "authorization": `${token}`},
    body:JSON.stringify({
      "role":"admin"
    })
  }).then(response => response.json)
  .then(json =>{
    if(json.status === true) message.success("Deleted Meal Category Successfully",7)
    dispatch(getMealCategories());
  })
  .catch(err => message.error("Unable to delete, please try later",7))
 
} 

export const changePageNumber = (pageNumber) => (dispatch, getState) => {
  dispatch({type:UPDATE_PAGE_NUMBER, pageNumber});
  }

const initialState = {
  loading: {
    submit: false,
    get:false
  },
  mealCategory: [],
  pageNumber:1,
  totalCategories:0
}



function mealcategory(state = initialState,action) {
  switch (action.type) {
    case SUBMIT_MEAL_CATEGORIES_REQUEST:
      return Object.assign({},state,{
        loading:{submit: true}
      })
    case SUBMIT_MEAL_CATEGORIES_SUCCESS:
      return Object.assign({},state,
        {loading:{submit: false}}
        )  
    case SUBMIT_MEAL_CATEGORIES_FAILURE:
      return Object.assign({},state,
        {loading:{submit: false}}
        )   
    case GET_MEAL_CATEGORIES_REQUEST:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: true}
      }) 
    case GET_MEAL_CATEGORIES_SUCCESS:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: false},
        mealCategory:action.mealCategory,
        totalCategories:action.totalCategories
      }) 
    case GET_MEAL_CATEGORIES_FAILURE:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: false}
      })
    case UPDATE_PAGE_NUMBER:
      return Object.assign({},state,{
        pageNumber:action.pageNumber
        })             
    default:
      return state;
  }
} 
export default mealcategory;