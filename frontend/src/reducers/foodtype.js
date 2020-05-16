import { message } from "antd";
import { GET_FOOD_GROUP_FAILURE } from "./foodgroup";
import fetchUrl from "../fetchurl";
export const GET_FOOD_TYPE_REQUEST = "GET_FOOD_TYPE_REQUEST";
export const GET_FOOD_TYPE_SUCCESS = "GET_FOOD_TYPE_SUCCESS";
export const GET_FOOD_TYPE_FAILURE = "GET_FOOD_TYPE_FAILURE";

export const DELETE_FOOD_TYPE_REQUEST = "DELETE_FOOD_TYPE_REQUEST";
export const DELETE_FOOD_TYPE_FAILURE = "DELETE_FOOD_TYPE_FAILURE";
export const DELETE_FOOD_TYPE_SUCCESS = "DELETE_FOOD_TYPE_SUCCESS";

export const SUBMIT_FOOD_TYPE_REQUEST = "SUBMIT_FOOD_TYPE_REQUEST";
export const SUBMIT_FOOD_TYPE_SUCCESS = "SUBMIT_FOOD_TYPE_SUCCESS";
export const SUBMIT_FOOD_TYPE_FAILURE = "SUBMIT_FOOD_TYPE_FAILURE";

export const UPDATE_FOOD_TYPE_REQUEST = "UPDATE_FOOD_TYPE_REQUEST";
export const UPDATE_FOOD_TYPE_SUCCESS = "UPDATE_FOOD_TYPE_SUCCESS";
export const UPDATE_FOOD_TYPE_FAILURE = "UPDATE_FOOD_TYPE_FAILURE";


export const getFoodType = () => (dispatch,getState) =>{
  
  
  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  dispatch({type:GET_FOOD_TYPE_REQUEST})
  return fetch(`${fetchUrl()}food-types`,{
    method:"POST",
    headers: {"Content-Type":"application/json",
    "authorization": `${token}`},
    body: JSON.stringify({
      "role":role
    })
  }).then(response => response.json())
  .then(json => {
    // console.log("json",json)
    if(json.status){
    const foodtype = json.data;
    dispatch({type:GET_FOOD_TYPE_SUCCESS, foodtype});
  }
    else if(!json.status){
      message.error(json.message,7)
      dispatch({type:GET_FOOD_GROUP_FAILURE})
    
    }
  }).catch(err => {
    // console.log("err",err)
    message.error("Unable to get food types, please try later",7)})
}

export const submitFoodType = (name,groupName,isEdit,selectedRow) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
    dispatch({type:SUBMIT_FOOD_TYPE_REQUEST})
    const role = localStorage.getItem('role');
    const group = groupName
    // console.log("group",group)
    return fetch(`${fetchUrl()}food-type/create`,{
      method:"POST",
      headers:{"Content-Type":"application/json","authorization": `${token}`},
      body:JSON.stringify({
        name:name,
        group: group,
        isEdit:isEdit,
        _id:selectedRow._id,
        "role":role
      })
    }).then(response => response.json())
    .then(json => {
      if(json.status){
        if(!isEdit) message.success(" food type added successfully",7)
        if(isEdit) message.success("food type updated successfully",7)
        
        dispatch({type:SUBMIT_FOOD_TYPE_SUCCESS})
        dispatch(getFoodType());
      }else if(!json.status){
        message.error(json.message,7)
        dispatch({type:SUBMIT_FOOD_TYPE_FAILURE})
      }
    })
}

export const deleteFoodType = (selectedRow) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  dispatch({type:DELETE_FOOD_TYPE_REQUEST})
  const role = localStorage.getItem('role');
  return fetch(`${fetchUrl()}food-type/delete-food-type?ID=${selectedRow._id}`,
  { method: "PUT",
    headers:{"Content-Type":"application/json","authorization": `${token}`},
    body: JSON.stringify({
      "role":role
    })
  }).then(response => response.json())
  .then(json => {
    if(json.status){    
    dispatch({type:DELETE_FOOD_TYPE_SUCCESS});
    message.success("Food Type deleted successfully",7)
  }
  
    else if(!json.status){
      message.warning(json.message,7)
      dispatch({type:DELETE_FOOD_TYPE_FAILURE})
    
    }
    dispatch(getFoodType());
  }).catch(err => message.error("Unable to delete food types, please try later",7))
}

const initialState = {
  loading: {
    get: false,
    delete: false,
    update:false
  },
  foodtype: []
}

function foodtype(state = initialState,action) {
  switch (action.type) {
    case GET_FOOD_TYPE_REQUEST:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: true
        }
      })
     case GET_FOOD_TYPE_SUCCESS:
      
       return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: false
        },
        foodtype: action.foodtype
      })  

     case GET_FOOD_TYPE_FAILURE:
       
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: false
        }
      }) 
     
      case DELETE_FOOD_TYPE_REQUEST: 
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          delete: true
        }
      })
      case DELETE_FOOD_TYPE_SUCCESS: 
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          delete: false
        }
      })
      case DELETE_FOOD_TYPE_FAILURE: 
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          delete: false
        }
      })

      case UPDATE_FOOD_TYPE_REQUEST:
        return Object.assign({},state,{
        loading:{
          ...state.loading,
          update: true
        }
      })
      case UPDATE_FOOD_TYPE_SUCCESS:
        return Object.assign({},state,{
        loading:{
          ...state.loading,
          update: false
        }
      })
      case UPDATE_FOOD_TYPE_FAILURE:
        return Object.assign({},state,{
        loading:{
          ...state.loading,
          update: true
        }
      }) 

    default:
      return state
  }
}

export default foodtype;