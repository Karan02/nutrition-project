import styled from "@emotion/styled";
import { message } from "antd"
import fetchUrl from "../fetchurl";
export const GET_CUISINE_REQUEST = "GET_CUISINE_REQUEST"
export const GET_CUISINE_SUCCESS = "GET_CUISINE_SUCCESS"
export const GET_CUISINE_FAILURE = "GET_CUISINE_FAILURE"

export const SUBMIT_CUISINE_REQUEST = "SUBMIT_CUISINE_REQUEST"
export const SUBMIT_CUISINE_SUCCESS = "SUBMIT_CUISINE_SUCCESS"
export const SUBMIT_CUISINE_FAILURE = "SUBMIT_CUISINE_FAILURE"

export const DELETE_CUISINE = "DELETE_CUISINE"

export const getCuisine = () => (dispatch,getState) => {

  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  dispatch({type: GET_CUISINE_REQUEST})
  return fetch(`${fetchUrl()}cuisine`,{
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
      const cuisines = json.data;
      
      
      dispatch({type:GET_CUISINE_SUCCESS,cuisines})}
    else if(json.status == false){
      message.error("unable to get cuisines")
      dispatch({type:GET_CUISINE_FAILURE})
    }
  }).catch(err => message.error("Unable to get cuisines, please try later",7))
}


export const submitCuisine = (name,isEdit,id) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  dispatch({type:SUBMIT_CUISINE_REQUEST})
  return fetch(`${fetchUrl()}cuisine/create`,{
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
      dispatch({type:SUBMIT_CUISINE_SUCCESS})
      dispatch(getCuisine());
    }
    else {
     if(!isEdit) message.success("Cuisine added successfully",7)
     if(isEdit)  message.success("Cuisine Updated successfully",7)
      dispatch({type:SUBMIT_CUISINE_FAILURE})
      dispatch(getCuisine());
    }
  }).catch(err => {
  
    message.error("Some error occured while submitting, please try later",7)
  })
}
export const deleteCuisine = (selectedRow) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  return fetch(`${fetchUrl()}cuisine/delete-cuisine?cuisineID=${selectedRow._id}`,{
    method: "PUT",
    headers: {"Content-Type": "application/json",
    "authorization": `${token}`},
    body:JSON.stringify({
      "role":"admin"
    })
  }).then(response => response.json())
  .then(json =>{
    console.log("json",json)
    if(json.status === true) message.success("Deleted Cuisine Successfully",7)
    dispatch(getCuisine());
  })
  .catch(err => message.error("Unable to delete, please try later",7))
 
} 
const initialState = {
  loading: {
    submit: false,
    get:false
  },
  cuisines: []
}



function cuisine(state = initialState,action) {
  switch (action.type) {
    case SUBMIT_CUISINE_REQUEST:
      return Object.assign({},state,{
        loading:{submit: true}
      })
    case SUBMIT_CUISINE_SUCCESS:
      return Object.assign({},state,
        {loading:{submit: false}}
        )  
    case SUBMIT_CUISINE_FAILURE:
      return Object.assign({},state,
        {loading:{submit: false}}
        )   
    case GET_CUISINE_REQUEST:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: true}
      }) 
    case GET_CUISINE_SUCCESS:
      return Object.assign({},state,{
        loading:{submit:false,
        get: false},
        cuisines:action.cuisines
      }) 
    case GET_CUISINE_FAILURE:
      return Object.assign({},state,{
        loading:{...state.loading,
        get: false}
      })           
    default:
      return state;
  }
} 
export default cuisine;