import React, { useState,useEffect } from "react";
import { Layout, Icon, Menu } from "antd";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
const { Header, Sider, Content } = Layout;
import { Head } from "./style.js";
import BankDetails from "./bank-details";
import Meal from "./meal";
import Cuisine from "./cuisine"
import IngredientsSVG from "../common/icons/ingredients/index";
import MealSVG from "../common/icons/meal/index";
import GroupSVG from "../common/icons/food-group/index";
import TypeSVG from "../common/icons/food-type/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Bank from "../common/icons/bank";
import Ingredients from "./ingredients";
import Login from "../login/index"
import { LoginA } from "../login/style.js";
import { logout,setCredentials } from "../../reducers/login";
import { getMeal } from "../../reducers/meal";
import {getBankDetails} from "../../reducers/bankdetails";
import  FoodGroup  from "./food-group/index.js";
import FoodType from "./food-type/index";
import MealCategory from "./food-category/index";
import {getFoodGroup} from "../../reducers/foodgroup";
import {getFoodType} from "../../reducers/foodtype";


const MainFrame = props => {
  const [collapsed, setCollapsed] = useState(true);
  const [gotData,setgotData] = useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  useEffect(() =>gettingData(),[])
  const HeaderLogo = () => {
    if (collapsed) return null;
    return <Head>Logo</Head>;
  };

  const collapsible = () => {
    if(width<767) return
    if (collapsed) return "menu-unfold";
    return "menu-fold";
  };

  const getContainer = () => {
   
    if (props.location.pathname === "/main-frame/bank") {
      return <BankDetails />;
    }else if (props.location.pathname === "/main-frame") {
     
      return <Meal />;
    }else if(props.location.pathname === "/main-frame/ingredients"){
      return <Ingredients />
    }else if(props.location.pathname === "/main-frame/foodGroup"){
      return <FoodGroup />
    }else if(props.location.pathname === "/main-frame/foodType"){
      return <FoodType />
    }else if(props.location.pathname === "/main-frame/foodCategory"){
      return <MealCategory />
    }else if(props.location.pathname === "/main-frame/cuisine"){
      return <Cuisine />
    }

  };

  const handleLogout = () => {
    props.logout()
    
  }
  
  const gettingData = () => {
    if(!props.meals || gotData){
    props.setCredentials();
   
    props.getMeal();
    props.getBankDetails();
    props.getFoodGroup();
    props.getFoodType();
    setgotData(true);
    }
  }
  
  const hide = props.login.role === "admin" ? "":"hide-content";
  
  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        {HeaderLogo()}
        <Icon
          className="trigger"
          type={collapsible()}
          onClick={() => setCollapsed(!collapsed)}
          
        />
       <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
         

          <Menu.Item key="1">
            <Link to="/main-frame">
              <Icon component={MealSVG} />
              <span className={collapsed ? "hideIcon" : "showIcon"}>
                Meals
              </span>{" "}
            </Link>
          </Menu.Item>

          
            
           <Menu.Item key="2">
             {/* <div className={hide}> */}
            <Link to="/main-frame/ingredients">
            <Icon 
            // type="read"
            component={IngredientsSVG} 
            className="icon-styling" />
              <span className="icon-styling">
                Ingredients
              </span>
            </Link>
            {/* </div> */}
          </Menu.Item>

          <Menu.Item key="3" className={hide}>
            <div className={hide}>
            <Link to="/main-frame/foodGroup">
              {" "}
              <Icon 
              // type="copy" 
              component={GroupSVG}
              className="icon-styling" />
              <span className="icon-styling">Food Group</span>
            </Link>
            </div>
          </Menu.Item>

          <Menu.Item key="4" className={hide}>
            <div className={hide}>
            <Link to="/main-frame/foodType">
              {" "}
              <Icon
              //  type="snippets" 
               className="icon-styling"
               component={TypeSVG} />
              <span className="icon-styling">Food Type</span>
            </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="5" className={hide}>
            <div className={hide}>
            <Link to="/main-frame/foodCategory">
              {" "}
              <Icon
              //  type="snippets" 
               className="icon-styling"
               component={TypeSVG} />
              <span className="icon-styling">Meal Category</span>
            </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="6" className={hide}>
            <div className={hide}>
            <Link to="/main-frame/cuisine">
              {" "}
              <Icon 
              // type="copy" 
              component={GroupSVG}
              className="icon-styling" />
              <span className="icon-styling">Cuisine</span>
            </Link>
            </div>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/main-frame/bank">
              <Icon component={Bank} />
              <span>Bank Details</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="8" onClick={handleLogout}>
            <Link to="/">
              {" "}
              <Icon type="logout" />
              <span>Logout</span>
            </Link>
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Content>
        {getContainer()}
      </Content>
    </Layout>
  );
};

const mapDispatchToProps = {
  logout,
  getMeal,
  getBankDetails,
  setCredentials,
  getFoodGroup,
  getFoodType
}
const mapStateToProps = state => ({
  meals: state.meals.meals,
  token: state.login.token,
  login:state.login,
  
})

MainFrame.propTypes = {
  logout: PropTypes.func,
  getMeal: PropTypes.func,
  getBankDetails: PropTypes.func,
  meals: PropTypes.array,
  className:PropTypes.string,
  type:PropTypes.string,
  onClick:PropTypes.func,
  history:PropTypes.object,
  location: PropTypes.object,
  key: PropTypes.string,
  // theme: PropTypes.string, 
  // mode:PropTypes.string, 
  defaultSelectedKeys:PropTypes.string,
  to:PropTypes.string
}
MainFrame.propTypes = {
  onClick: () => {},
  // theme: "light",
  // mode: "verticle",

}

export default connect(mapStateToProps,mapDispatchToProps)(MainFrame);
