import * as React from "react";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";
import Login from "./login/index";
import MainFrame from "./main-frame/index";

const authenticateRoute = (token) => {
  
  if(token) {
    return <Route path="/main-frame" component={MainFrame} />
  }else{
   return <Redirect to={{pathname: '/'}} />
  }
}

const MainWrapper = (props) => {
  const token = localStorage.getItem('token')
  
  return (
    
    <Switch>
      <Route exact path="/" component={Login} />
      {/* <Route path="/main-frame" component={MainFrame} /> */}
      {authenticateRoute(token)}
    </Switch>
  );
};

const mapState = state => ({
token: state.login.token
})

export default connect(mapState,null)(MainWrapper);
