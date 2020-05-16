import React from "react";
import MainWrapper from "./components";
require('dotenv').config();
import { StaticRouter as Routers ,HashRouter as Routerh, browserHistory,BrowserRouter} from 'react-router-dom';
import { createBrowserHistory,createMemoryHistory } from "history";
import  "./global.css";

let Router;
if (process.env.BROWSER) {
    
    Router = Routerh
}else{
  Router = Routers
}


// let history
let createHistory

if (process.env.BROWSER) {
  
    createHistory = createBrowserHistory
} else {
  
    createHistory = createMemoryHistory
}




const App = () => {
 
  return (
    
    <Router
    history={createHistory()}
    >
      <MainWrapper />
    </Router>
  );
};

export default (App);