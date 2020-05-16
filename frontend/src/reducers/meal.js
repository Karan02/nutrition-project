import regeneratorRuntime from "regenerator-runtime";
import $ from "jquery";
import { message } from "antd";
import { DELETE_BANK_ACCOUNT_FAILURE } from "./bankdetails";
import fetchUrl from "../fetchurl";
var fileDownload = require("js-file-download");
var jsonexport =  require("jsonexport");
const axios = require("axios");
export const SUBMIT_MEAL_REQUEST = "SUBMIT_MEAL_REQUEST";
export const SUBMIT_MEAL_SUCCESS = "SUBMIT_MEAL_SUCCESS";
export const SUBMIT_MEAL_FAILURE = "SUBMIT_MEAL_FAILURE";

export const GET_MEAL_REQUEST = "GET_MEAL_REQUEST";
export const GET_MEAL_SUCCESS = "GET_MEAL_SUCCESS";
export const GET_MEAL_FAILURE = "GET_MEAL_FAILURE";

export const DELETE_MEAL_REQUEST = "DELETE_MEAL_REQUEST";
export const DELETE_MEAL_SUCCESS = "DELETE_MEAL_SUCCESS";
export const DELETE_MEAL_FAILURE = "DELETE_MEAL_FAILURE";

export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST"; 

export const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER";

export const SAVE_FILE = "SAVE_FILE";
export const SET_SEARCH = "SET_SEARCH";

export const searchMeal = (number) => (dispatch,getState) => {
  const { token } = getState().login;
  let { pageNumber,search } = getState().meals;
  if(number === 1) pageNumber = 1;
  dispatch({type: GET_MEAL_REQUEST});
  return fetch(`${fetchUrl()}restaurant/mealSearch?offset=${pageNumber}&search=${search}`,{
    method: "GET",
    headers: {
      "authorization": `${token}`
    }
  })
  .then(response => response.json())
  .then(json =>{
    if(json.status === true){
      const meal = json.data;
      const totalMeal = json.totalMeal;
      
      dispatch({type:GET_MEAL_SUCCESS,meal,totalMeal});
    }  
    if(json.status === false){
      const value = "";
      dispatch({type:SET_SEARCH,value});
      message.error(json.message,7);
      dispatch({type: GET_MEAL_FAILURE});
    }
  })
  .catch(err => {
    message.error("Unable to get meals",7);
});
};

export const setSearch = (value) => (dispatch,getState) => {
  dispatch({type:SET_SEARCH,value});
};

export const getMeal = () => (dispatch,getState) => {
  // console.log("get meals")
  const { restaurantID } = getState().login;
  const { token } = getState().login;
  const { pageNumber } = getState().meals;
  // console.log("in get meal page",pageNumber)
  dispatch({type: GET_MEAL_REQUEST});
  return fetch(`${fetchUrl()}restaurant/meals?offset=${pageNumber}`,{
    method: "GET",
    headers: {
      "authorization": `${token}`
    }
  })
  .then(response => response.json())
  .then(json =>{
  //  console.log("json",json)
    if(json.status === true){
      const meal = json.data;
      const totalMeal = json.totalMeal;
      dispatch({type:GET_MEAL_SUCCESS,meal,totalMeal});
    }  
    if(json.status === false){
      const value = "";
      dispatch({type:SET_SEARCH,value});
      dispatch(changePageNumber(1));
      // dispatch(getMeal());
      message.error(json.message,7);
      dispatch({type: GET_MEAL_FAILURE});
    }
  })
  .catch(err => {
    message.error("Unable to get meals",7);
});
};

export const  postFile =  () => async (dispatch,getState) => {
  
  const saveFile = getState().meals.saveFile;
  const { restaurantID } = getState().login;
  
  
  dispatch({type:SUBMIT_MEAL_REQUEST});
  const formData = new FormData();
  const yourFile = saveFile;

  formData.append("file", yourFile.originFileObj);
  
  await axios({
    method:"POST",
    url:`${fetchUrl()}import-meal`,
    data: formData,            
  }).then(json => {
  //  console.log("here",json)
    if(json.status){
   
    dispatch({type:SUBMIT_MEAL_SUCCESS});  
    // if(json.count > 0) message.warning(`${json.count} meal/s already exist`);
    dispatch(getMeal());
    }}).catch(err => 
    {
      
    // console.log("err",err);
    message.error(err);
  }
    );
  return;  
};

export const fileblob = (file) => (dispatch,getState) => {
  

  const resultJson = file;
  dispatch({type: SAVE_FILE,resultJson});
  
};

function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  let headers = lines[0].split(",");
  
 
  const lastElement = headers[headers.length - 1];
  
  const whiteSpace = lastElement.charAt(lastElement.length - 1);
  if(whiteSpace.match(/^\s+$/)){

    
    headers[headers.length - 1] = lastElement.slice(0, -1);
  }
  
  for (let i = 1; i < lines.length; i++) {        
      if (!lines[i])
          continue;
      const obj = {};
      const currentline = lines[i].split(",");
      
      for (let j = 0; j < headers.length; j++) {
       
          obj[headers[j]] = currentline[j].replace(/(\r\n|\n|\r)/gm, "");
          
         
      }
      result.push(obj);
      
  }
  
  return result;
}



export const handleDownload = (selectedRow) => (dispatch,getState) => {
  

  const { restaurantID,token } = getState().login;
  dispatch({type:SUBMIT_MEAL_REQUEST});

  $.ajax({
    url: `${fetchUrl()}export-meal/${restaurantID}`,
    type: "POST",
    dataType: "json",
    timeout: 3600000,
    success: function(response) { const json = response;
      if(json.status){
   
        dispatch({type:SUBMIT_MEAL_SUCCESS}); 
      // jsonexport(JSON.parse(json.data),function(err, csv){
      jsonexport(JSON.parse(json.data),function(err, csv){
        
        if(err) return console.log(err);
        fileDownload(csv, "meals.csv");
    });
  }else{
    dispatch({type:SUBMIT_MEAL_FAILURE});
  }
    },
    error: function(xmlhttprequest, textstatus, message) {
        if(textstatus==="timeout") {
            alert("got timeout");
        } else {
            alert(textstatus);
        }
        dispatch({type:SUBMIT_MEAL_FAILURE});
    }
});

  return fetch(`${fetchUrl()}export-meal/${restaurantID}`,{
    method:"POST",
    body:{
      selectedRow:selectedRow
    }
  }).then(response => response.json())
  .then(json =>{
   
    if(json.status){
   
      dispatch({type:SUBMIT_MEAL_SUCCESS}); 
    // jsonexport(JSON.parse(json.data),function(err, csv){
    jsonexport(JSON.parse(json.data),function(err, csv){
      
      if(err) return console.log(err);
      fileDownload(csv, "meals.csv");
  });
}else{
  dispatch({type:SUBMIT_MEAL_FAILURE});
}
  });
};

export const sample = (value) => (dispatch,getState) => {
  
  return fetch(`${fetchUrl()}download-sample-${value}`,{
    method:"GET",
  }).then(response => response.json())
  .then(json =>{
    
    jsonexport(JSON.parse(json.data),function(err, csv){
      if(err) return console.log(err); 
      
      fileDownload(csv, `${value}-sample.csv`);
  });
  });
};

export const submitMeal = (productName,mealType,mealCuisine,mealSize,mealQuantity,mealPrice,ingredientsList,isEdit,mealID,restaurantName,restaurantNameID) => (dispatch,getState) => {
  const { restaurantID,token } = getState().login;
  
  dispatch({type:SUBMIT_MEAL_REQUEST});
  return fetch(`${fetchUrl()}restaurant/submitmeal?mealId=${mealID}`,{
    method:"POST",
    headers: {"Content-Type":"application/json",
      "authorization": `${token}`
    },
    body: JSON.stringify({
      mealName: productName,
      mealCategory:mealType,
      mealCuisine,
      mealSize,
      mealPrice,
      mealQuantity,
      ingredients:ingredientsList,
      restaurantID:restaurantID,
      isEdit: isEdit,
      restaurantName,
      restaurantNameID,
      "role":"admin"
    })
  })
  .then(response => response.json())
  .then(json => {
    if(json.status === true){
      if(!isEdit) message.success("Meal Added Successfully",7);
      if(isEdit) message.success("Meal Updated Successfully",7);

      dispatch({type:SUBMIT_MEAL_SUCCESS});
    }
    else if(json.status === false){
      message.error(json.message,7);
      dispatch({type:SUBMIT_MEAL_FAILURE});
      
    }
    dispatch(getMeal());
})
  .catch(err => message.error("Something went wrong",7));
};

export const deleteMeal = (meal) => (dispatch,getState) => {
  
  const mealId = meal._id;
  const {token} = getState().login;
 
  const role = localStorage.getItem("role");
  return fetch(`${fetchUrl()}restaurant/meal/${mealId}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json",
   
      "authorization": `${token}`
    
  },
    body: JSON.stringify({
      "role":role
    })
  })
  .then(response => response.json())
  .then(json => {
    if(json.status === true){
      message.success("Deleted meal successfully",7);
      dispatch({type: DELETE_MEAL_SUCCESS});
    }else if(json.status === false){
      
      message.error(json.message,7);
      dispatch({type: DELETE_MEAL_FAILURE});
    }
    dispatch(getMeal());
  }
  ).catch(err => message.error("Failure deleting",7));
};

export const getIngredientsInMeals = (limit) => (dispatch,getState) => {
  // console.log("limit",limit)
  dispatch({type:GET_INGREDIENTS_REQUEST})
  const {token,restaurantID} = getState().login;
  const role = localStorage.getItem('role');
  return fetch(`${fetchUrl()}meal-ingredients?limit=${limit}`,{
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
        dispatch({type: GET_INGREDIENTS_SUCCESS,ingredients})
      }else if(json.status === false){
        dispatch({type: GET_INGREDIENTS_FAILURE})
      }
  }).catch(error => {    
    console.log("error",error)
  })
}

export const changePageNumber = (pageNumber) => (dispatch, getState) => {
  console.log("pagenumber",pageNumber)
dispatch({type:UPDATE_PAGE_NUMBER, pageNumber});

};

const initialState = {
  loading:{
    getMeal: false,
    submitMeal: false,
    deleteMeal: false,
    ingredients: false
  },
  meals:[],
  pageNumber: 1,
  totalMeal: 0,
  saveFile:null,
  search: "",
  ingredientList:[]
};

function meals(state = initialState,action){
  
  switch (action.type) {
    case SUBMIT_MEAL_REQUEST:
      return Object.assign({},state,
        {
          loading:{
            ...state.loading,
            submitMeal:true,    
          }
        });
    case SUBMIT_MEAL_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          submitMeal: false
        }
      });
    case GET_INGREDIENTS_REQUEST:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          ingredients:true
        }
      })
    case GET_INGREDIENTS_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          ingredients:false
        },
        ingredientList:action.ingredients
      })
    case GET_INGREDIENTS_FAILURE:    
    return Object.assign({},state,{
      loading:{
        ...state.loading,
        ingredients:false
      }
    })    
    case SUBMIT_MEAL_FAILURE:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          submitMeal: false
        }
      });    
    case GET_MEAL_REQUEST:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          getMeal:true,
          
        }
      });   
    case GET_MEAL_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          getMeal: false,
        },
        meals: action.meal,
        totalMeal:action.totalMeal
      });   
    case GET_MEAL_FAILURE:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          getMeal: false,
        }
      });  
   
    case DELETE_MEAL_FAILURE:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          deleteMeal: false
        }
      });
    case DELETE_MEAL_SUCCESS:
      return Object.assign({},state,{
        loading:{
          ...state.loading,
          deleteMeal: false
        }
      });
    case DELETE_MEAL_REQUEST:
        return Object.assign({},state,{
          loading:{
            ...state.loading,
            deleteMeal: true
          }
    });
    case UPDATE_PAGE_NUMBER:
      return Object.assign({},state,{
        pageNumber:action.pageNumber
      });
    
    case SAVE_FILE:
      return Object.assign({},state,{
        saveFile:action.resultJson
      });
    case SET_SEARCH:
      return Object.assign({},state,{
        search:action.value
      });  
    default:
      return state;
  }

}

export default meals;