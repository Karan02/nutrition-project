import styled from "@emotion/styled";
import { message } from "antd"
import fetchUrl from "../fetchurl";
export const GET_FOOD_GROUP_REQUEST = "GET_FOOD_GROUP_REQUEST"
export const GET_FOOD_GROUP_SUCCESS = "GET_FOOD_GROUP_SUCCESS"
export const GET_FOOD_GROUP_FAILURE = "GET_FOOD_GROUP_FAILURE"

export const SUBMIT_FOOD_GROUP_REQUEST = "SUBMIT_FOOD_GROUP_REQUEST"
export const SUBMIT_FOOD_GROUP_SUCCESS = "SUBMIT_FOOD_GROUP_SUCCESS"
export const SUBMIT_FOOD_GROUP_FAILURE = "SUBMIT_FOOD_GROUP_FAILURE"

export const DELETE_FOOD_GROUP = "DELETE_FOOD_GROUP"

export const getFoodGroup = () => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  dispatch({type: GET_FOOD_GROUP_REQUEST})
  return fetch(`${fetchUrl()}food-groups`,{
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
      const foodGroup = json.data;
      dispatch({type:GET_FOOD_GROUP_SUCCESS,foodGroup})}
    else if(json.status == false){
      message.error("unable to get food groups",7)
      dispatch({type:GET_FOOD_GROUP_FAILURE})
    }
  }).catch(err => message.error("Unable to get food groups, please try later",7))
}


export const submitFoodGroup = (name,isEdit,id) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  dispatch({type:SUBMIT_FOOD_GROUP_REQUEST})
  return fetch(`${fetchUrl()}foodGroup/create`,{
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
      dispatch({type:SUBMIT_FOOD_GROUP_SUCCESS})
      dispatch(getFoodGroup());
    }
    else {
      if(!isEdit) message.success("food group added successfully",7)
      if(isEdit) message.success("food group updated successfully",7)

      dispatch({type:SUBMIT_FOOD_GROUP_FAILURE})
      dispatch(getFoodGroup());
    }
  }).catch(err => {
  
    message.error("Some error occured while submitting, please try later",7)
  })
}
export const deleteFoodGroup = (selectedRow) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  return fetch(`${fetchUrl()}foodGroup/delete-food-group?groupID=${selectedRow._id}`,{
    method: "PUT",
    headers: {"Content-Type": "application/json",
    "authorization": `${token}`},
    body:JSON.stringify({
      "role":"admin"
    })
  }).then(response => response.json())
  .then(json =>{
    if(json.status === true) message.success("Deleted Food Group Successfully",7)
    
    if(!json.status) message.warning(json.message,7)
    dispatch(getFoodGroup());
  })
  .catch(err => message.error("Unable to delete, please try later",7))
 
} 
const initialState = {
  loading: {
    submit: false,
    get:false
  },
  foodGroup: []
}



function foodgroup(state = initialState,action) {
  switch (action.type) {
    case SUBMIT_FOOD_GROUP_REQUEST:
      return Object.assign({},state,{
        loading:{submit: true}
      })
    case SUBMIT_FOOD_GROUP_SUCCESS:
      return Object.assign({},state,
        {loading:{submit: false}}
        )  
    case SUBMIT_FOOD_GROUP_FAILURE:
      return Object.assign({},state,
        {loading:{submit: false}}
        )   
    case GET_FOOD_GROUP_REQUEST:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: true}
      }) 
    case GET_FOOD_GROUP_SUCCESS:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: false},
        foodGroup:action.foodGroup
      }) 
    case GET_FOOD_GROUP_FAILURE:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: false}
      })           
    default:
      return state;
  }
} 
export default foodgroup;