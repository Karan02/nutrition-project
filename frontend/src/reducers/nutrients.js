export const GET_NUTRIENT_REQUEST = "GET_NUTRIENT_REQUEST"
export const GET_NUTRIENT_SUCCESS = "GET_NUTRIENT_SUCCESS"
export const GET_NUTRIENT_FAILURE = "GET_NUTRIENT_FAILURE"
import fetchUrl from "../fetchurl";
import { message } from "antd"
let request = 0
export const getNutrient = (id) => (dispatch,getState) => {
  
    dispatch({type:GET_NUTRIENT_REQUEST})
    
    return fetch(`${fetchUrl()}nutrient-content/${id}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      
    }).then(response => response.json())
    .then(json => {
      if(json.status){
        const data = json.data
        const calories = json.calories
        // message.success("unable to get nutrient")
        dispatch({type:GET_NUTRIENT_SUCCESS,data,calories})
        
      }
      else{
        message.error("Unable to get nutrient",7)
        dispatch({type:GET_NUTRIENT_FAILURE})
      }
    })
    .catch(err => console.log("err",err))
    
    
}

const initialState = {
  loading:{
    get:false
  },
  data:null,
  calories:0
}

function nutrient(state = initialState,action) {

  switch (action.type) {
    case GET_NUTRIENT_REQUEST:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: true
        }
      })
    case GET_NUTRIENT_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: false
        },
        data:action.data,
        calories:action.calories
      })  
    case GET_NUTRIENT_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          get: false
        }
      })      
    default:
      return state
  }
  
}

export default nutrient;