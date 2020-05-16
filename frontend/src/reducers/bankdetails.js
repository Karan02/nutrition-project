import { message } from "antd"
import fetchUrl from "../fetchurl";

export const GET_BANK_DETAILS_REQUEST = "GET_BANK_DETAILS_REQUEST"
export const GET_BANK_DETAILS_SUCCESS = "GET_BANK_DETAILS_SUCCESS"
export const GET_BANK_DETAILS_FAILURE = "GET_BANK_DETAILS_FAILURE"

export const DELETE_BANK_ACCOUNT_REQUEST = "DELETE_BANK_ACCOUNT_REQUEST"
export const DELETE_BANK_ACCOUNT_SUCCESS = "DELETE_BANK_ACCOUNT_SUCCESS"
export const DELETE_BANK_ACCOUNT_FAILURE = "DELETE_BANK_ACCOUNT_FAILURE"

export const ADD_BANK_DETAILS_REQUEST = "ADD_BANK_DETAILS_REQUEST"
export const ADD_BANK_DETAILS_SUCCESS = "ADD_BANK_DETAILS_SUCCESS"
export const ADD_BANK_DETAILS_FAILURE = "ADD_BANK_DETAILS_FAILURE"

export const getBankDetails = () => (dispatch,getState) => {

  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  dispatch({type:GET_BANK_DETAILS_REQUEST})
  return fetch(`${fetchUrl()}restaurant/bank-details/${restaurantID}`,{
    method: "POST",
    headers: {
      "authorization": `${token}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "role": role
    })
    
  }).then(response => response.json())
  .then(json =>{
    
    const bankDetails = json.data
    if(json.status === true){
    dispatch({type:GET_BANK_DETAILS_SUCCESS,bankDetails})
    }else if(json.status === false){
      
      dispatch({type:GET_BANK_DETAILS_FAILURE})
    }
  }).catch(err => {
    message.error("Failed to Fetch Bank Details",7)
  })
}

export const deleteBankDetails = (bankId) => (dispatch,getState) => {
  
  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  // dispatch({type:DELETE_BANK_ACCOUNT_REQUEST})
  return fetch(`${fetchUrl()}restaurant/delete-bank-detail`,{
    method:"PUT",
    headers:{"Content-Type":"application/json",
    
    "authorization": `${token}`
    },
    body: JSON.stringify({
      "restaurantId": restaurantID,
      "bankId"  :bankId, 
      "role": role 
    })
  }).then(response => response.json())
  .then(json => {
   
    if(json.status){
      message.success("Deleted Account Successfully",7)
     }
     else if(json.status === false){
       message.error(json.message,7)
     }
    dispatch(getBankDetails());
  })

}

export const addBankDetails = (bankName,IFSCcode,accountNumber,paypalID,isEdit,bankId) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login
  const role = localStorage.getItem('role');
  // console.log("bankName,IFSCcode,accountNumber,paypalID",bankName,IFSCcode,accountNumber,paypalID)
  return fetch(`${fetchUrl()}restaurant/bank-details/${restaurantID}?bankId=${bankId}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json",
   
      "authorization": `${token}`
    
  },
    body:JSON.stringify({
      "accountNumber": accountNumber,
      "ifscCode": IFSCcode,
      "paypalId": paypalID,
      "bankName": bankName,
      "isEdit": isEdit,
      "role": role
    })
  }).then(response => response.json())
  .then(json => {
    if(json.status){
      if(!isEdit)  message.success("Added Bank Details Successfully",7)
      if(isEdit)  message.success("Bank Details Updated Successfully",7)
    }
    else if(json.status === false){
      message.error(json.message,7)
    }
    dispatch(getBankDetails());
  })
}


const initialState = {
  loading:{
    getDetails: false,
    deleteDetails: false,
    updateDetails: false,
  },
  bankDetails: [],
}

function bank(state=initialState,action) {
  switch (action.type) {
    case GET_BANK_DETAILS_REQUEST:
      return Object.assign({},state,{
        loading: {
          ...state.loading,
          getDetails:true,
        }
      })
    case GET_BANK_DETAILS_SUCCESS:
      return Object.assign({},state,{
       loading: {
         ...state.loading,
         getDetails:false,
       }, 
       bankDetails: action.bankDetails,
      })  
    case GET_BANK_DETAILS_FAILURE:
      return Object.assign({},state,{
        loading: {
          ...state.loading,
          getDetails:false,
        }
      })  
    default:
      return state;
  }
}

export default bank;