import { message } from "antd"
import fetchUrl from "../fetchurl"
export const LOGIN_REQUEST = "Login.LOGIN_REQUEST"
export const LOGIN_SUCCESS = "Login.LOGIN_SUCCESS"
export const LOGIN_FAILURE = "Login.LOGIN_FAILURE"
export const LOGOUT = "Login.LOGOUT"

export const SET_CREDENTIALS = "Login.SET_CREDENTIALS"
export const PASSWORD_CHANGED = "Login.PASSWORD_CHANGED"

export const loggedIn = () => (dispatch,getState) => {
  const passwordChange = false
  dispatch({type:PASSWORD_CHANGED,passwordChange})
}

export const loginRequest = (values) => (dispatch,getState)=>{
  
  dispatch({type:LOGIN_REQUEST});
  
  return fetch(`${fetchUrl()}login`, {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,

    }),
  })
  .then(response => response.json())
  .then(json => {
    
    if(json.status === true){
    
      const status = json.status;
      const token = json.token;
      const restaurantID = json.data.id;
      const role = json.role;
      const isLoggedIn = json.data.isLoggedIn;
      localStorage.setItem("role",role);
      localStorage.setItem("token",token);
      localStorage.setItem("restaurantID",restaurantID);
      dispatch({type:LOGIN_SUCCESS,status,token,restaurantID,role,isLoggedIn});
    }
    else if(json.status === false){
      const status = json.status;
      const message = json.message;
      dispatch({type:LOGIN_FAILURE,status,message})
    }
  })
  .catch(err =>alert(err))
}

export const logout = () => (dispatch) => {
  localStorage.setItem("token","");
  localStorage.setItem("restaurantID","");
  localStorage.setItem("role","");
  dispatch({type:LOGOUT})
}

export const setCredentials = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const restaurantID = localStorage.getItem("restaurantID");
  const role = localStorage.getItem("role")
  dispatch({type:SET_CREDENTIALS,token,restaurantID,role});
}

export const changePassword = (password) => (dispatch,getState) => {
  const {token,restaurantID} = getState().login
  return fetch(`${fetchUrl()}change-password/${restaurantID}`,{
    method: "POST",
    headers:{"Content-Type":"application/json",
    "authorization": `${token}`
  },
  body:JSON.stringify({
    userId:restaurantID,
    password:password
  })
  }).then(response => response.json()).then(json => {
    if(json.status){
      message.success(json.message,7)
      const passwordChange = true
      dispatch({type: PASSWORD_CHANGED,passwordChange})

    }
    
  })

}



// const tokenValue = ""
// const restaurantID = ""
// const role = ""
if (typeof window === 'undefined') {
  require('localstorage-polyfill');
}

  const tokenValue = localStorage.getItem('token');
  const restaurantID = localStorage.getItem('restaurantID');
  const role = localStorage.getItem('role');


const initialState = {
  loading: false,
  status: false,
  token:"" || tokenValue,
  message:"",
  restaurantID:""|| restaurantID,
  role: "" || role,
  isLoggedIn: false,
  passwordChange: false
}

function login(state = initialState, action){
  switch(action.type){
    case LOGIN_REQUEST:
      return Object.assign({},state,{
        loading:true
      })
    case LOGIN_SUCCESS:
      return Object.assign({},state,{
        status: action.status,
        token: action.token,
        loading:false,
        message: "",
        restaurantID: action.restaurantID,
        role: action.role,
        isLoggedIn: action.isLoggedIn,
        // passwordChange: false
        
      })
    case LOGIN_FAILURE:
      return Object.assign({},state,{
        status: action.status,
        message: action.message,
        loading: false,
        token:"",
        restaurantID:"",
        role: "",
        isLoggedIn:false,
        passwordChange: false
      })
    case LOGOUT:
      return Object.assign({},state,{
        status: false,
        token: "",
        restaurantID:"",
        role: "",
        isLoggedIn:false,
        passwordChange:false
      })
    case SET_CREDENTIALS:
      return Object.assign({},state,{
        token: action.token,
        restaurantID: action.restaurantID,
        role: action.role
      })  
    case PASSWORD_CHANGED:
      return Object.assign({},state,{
        passwordChange:action.passwordChange
      })
       
    default:
      return state
  }
}
export default login