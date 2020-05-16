import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
  Inputs,
  LoginContainer,
  LoginImage,
  NutritionImage,
  InnerContainer,
  LoginA,
  Logo,
  AdminLogin,
  UserName,
  InputLabels,
  PasswordLabel,
  PasswordTrigger,
  Show,
  ErrorLogin,
  style,
  PasswordMatch
} from "./style.js";

import { loginRequest,changePassword,loggedIn } from "../../reducers/login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form,Input, Checkbox, Button } from "antd";
// import useStyles from 'isomorphic-style-loader/useStyles'
import { css, cx } from "emotion";
import MainFrame from "../main-frame/index";

var classNames = require("classnames");

const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Login = props => {
  const [check, setCheck] = useState(false);
  const [visibleChangePassword,setvisibleChangePassword] = useState(false);
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")
  const [submitDisabled,setSubmitDisabled] = useState(true)
  
  

  useEffect(() =>{
    if(props.login.status){
      if(props.login.role === "admin"){
        props.history.push("/main-frame");
        <Route path="/main-frame" component={MainFrame} />
      }else{
        setvisibleChangePassword(true)
      }

    }
    
  },[props.login.status])
  useEffect(() =>{
    if(props.login.passwordChange){
      props.history.push("/main-frame");
      <Route path="/main-frame" component={MainFrame} />
     
    }
    if(props.login.isLoggedIn){
      props.history.push("/main-frame");
      <Route path="/main-frame" component={MainFrame} />
    }
  })
  

  const password_visibility = () => {
    var type = check ? "text" : "password";
    return type;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.loginRequest(values);
      }
    });
  };
  const getErrorMessage = () =>{
    const message = (props.login.message !== "") ? <label style={style.errorLogin}>{props.login.message}</label>:null
    return message
  }
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  

  const handlePasswordSubmit = () => {
    props.changePassword(password)
  }

  

  const getContainer = () =>{
    return visibleChangePassword ? ( 
      <div>
      <div className="PasswordInput Password-confirm">
      <Input
        type="password"
        className={classNames(Inputs, "foo")}
        placeholder="Please Enter New Password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
      />
        
        
      </div>
      <div className="PasswordInput Password-confirm">
     <Input
        type="password"
        className={classNames(Inputs, "foo")}
        placeholder="Please Confirm New Password"
        value = {confirmpassword}
        onChange = {(e) => setConfirmPassword(e.target.value)}
      />
        
        
      
      </div>
      <PasswordMatch className={submitDisabled ? "password-not-match":"password-not-match-disabled"}>Kindly Enter Matching Password</PasswordMatch>
      <div><Button onClick={handlePasswordSubmit} disabled={submitDisabled} className="password-change-button">Submit</Button></div>
      </div>):(
      <Form onSubmit={handleSubmit} >
          <UserName>
            <InputLabels>User Name</InputLabels>
          </UserName>
          
          <div className="UserInput">
          <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(
            <Input
              placeholder="Please Enter Username"
              className={classNames(Inputs, "foo")}
              type="email"
            />)}
            </Form.Item>
          </div>
          <div className="Password">
            <PasswordLabel>Password</PasswordLabel>
          </div>
          <div className="PasswordInput">
          <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
            {/* <Input.Password placeholder="input password" /> */}
            {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(<Input
            type={password_visibility()}
            className={classNames(Inputs, "foo")}
            placeholder="Please Enter Password"
          />)}
            
            <PasswordTrigger className="password-trigger">
              <Checkbox
                style={style.checkBox}
                checked={check}
                onChange={() => setCheck(!check)}
              >
                <Show>Show</Show>
              </Checkbox>
              {/* <input checked ={check} onClick={() => setCheck(!check)} type="checkbox" />Show */}
            </PasswordTrigger>
            </Form.Item>
          </div>
          <div>
           {getErrorMessage()}
           
            {/* <Link to="/main-frame"> */}
              <LoginA
              //  type="submit" 
               onClick={handleSubmit} 
               disabled={hasErrors(getFieldsError())}>
                 LOGIN
              </LoginA>
            {/* </Link> */}
          </div>
          </Form>
    );
  }
  if(submitDisabled && (password === confirmpassword && password !== "") ) setSubmitDisabled(false)
  if(!submitDisabled && (password !== confirmpassword || password ==="" )) setSubmitDisabled(true)
  // if((password === confirmpassword) && !statement) setStatement(true)
  // if((password !== confirmpassword) && statement) setStatement(false)
  return (
    <LoginContainer>
      <LoginImage className="login-image">
        <InnerContainer className="inner-container">
          <Logo>Logo</Logo>
          <AdminLogin>Admin Login</AdminLogin>
          {getContainer()}
         
        </InnerContainer>
      </LoginImage>
    </LoginContainer>
  );
};

const mapStateToProps = state =>({
  login:state.login,
});

const mapDispatchToProps = {
  loginRequest,
  changePassword,
  loggedIn
}

Login.propTypes = {
  login:  PropTypes.object,
  loginRequest: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.object,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  validateStatus: PropTypes.string,
  help: PropTypes.string,
  getFieldDecorator:PropTypes.func, 
  getFieldsError:PropTypes.func, 
  getFieldError:PropTypes.func, 
  isFieldTouched:PropTypes.func,
  form: PropTypes.object,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
}
Login.defaultProps = {
  required: false,
  checked: false,
  disabled: false,
  
}


export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Login));
