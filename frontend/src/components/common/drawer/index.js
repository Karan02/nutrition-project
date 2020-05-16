import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Drawer,
  Select,
  
} from "antd";
import PropTypes from 'prop-types';
import BankForm from "../../main-frame/bank-details/bank-form/index";
import AddMeal from "../../main-frame/meal/drawer/add-meal/index";
const { Option } = Select;
import { Buttons, Cancel, Save } from "./style.js";
import  AddIngredients  from "../../main-frame/ingredients/drawer/index";
import AddFoodGroup from "../../main-frame/food-group/drawer/index";
import AddFoodType from "../../main-frame/food-type/drawer/index";
import AddMealCategory from "../../main-frame/food-category/drawer/index";
import AddCuisine from "../../main-frame/cuisine/drawer/index";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const DrawerForm = (props) => {
  
  const [isSave,setIsSave] = useState(false);
  const [isCancel,setIsCancel] = useState(false);
  const [saveButtonDisabled,setSaveButtonDisabled] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


 
  const changeSaveState = (value) => setIsSave(value);

  const changeCancelState = () => setIsCancel(false);

  const getContainer = (propsObj) => {
    if (propsObj.title === "ADD BANK DETAILS"){
     
      return (
        <BankForm
          selectedbank={propsObj.selectedbank}
          isSave={isSave}
          isCancel={isCancel}
          isEditBank={propsObj.isEditBank}
          changeSaveState={changeSaveState}
          changeCancelState={changeCancelState}
          setSaveButtonDisabled={setSaveButtonDisabled}
          saveButtonDisabled={saveButtonDisabled}
          onClose={propsObj.onClose}
          setIsEdited={propsObj.setIsEdited}
          edited={propsObj.edited}
        />
      );}
    else if (propsObj.title === "ADD MEAL")
      return (
        <AddMeal
        isSave={isSave}
        isCancel={isCancel}
        changeSaveState={changeSaveState}
        changeCancelState={changeCancelState}
        setSaveButtonDisabled={setSaveButtonDisabled}
        saveButtonDisabled={saveButtonDisabled}
        isEdit={props.isEdit}
        selectedRow={props.selectedRow}
        onClose = {props.onClose}
        />
      );
    else if (propsObj.title === "Add Ingredients")
        return(
          <AddIngredients
            isSave= {isSave}
            isCancel= {isCancel}
            changeSaveState= {changeSaveState}
            changeCancelState= {changeCancelState}
            setSaveButtonDisabled= {setSaveButtonDisabled}
            saveButtonDisabled= {saveButtonDisabled}
            onClose = {props.onClose}
            isEdit={props.isEdit}
            selectedRow={props.selectedRow} 
            edited={props.edited}
            setEdited={props.setEdited}
          />
        )
    else if(propsObj.title === "Add Food Group"){ 
      return (
      <AddFoodGroup 
      isSave={isSave}
      isCancel={isCancel}
      changeSaveState={changeSaveState}
      changeCancelState={changeCancelState}
      setSaveButtonDisabled={setSaveButtonDisabled}
      saveButtonDisabled={saveButtonDisabled}
      onClose = {props.onClose}
      isEdit={props.isEdit}
      selectedRow={props.selectedRow} 
      edited={props.edited}
      setEdited={props.setEdited}
      />
      )
    }

    else if(propsObj.title === "Add Food Type") {
     
       return (
       <AddFoodType 
       isSave={isSave}
       isCancel={isCancel}
       changeSaveState={changeSaveState}
       changeCancelState={changeCancelState}
       setSaveButtonDisabled={setSaveButtonDisabled}
       saveButtonDisabled={saveButtonDisabled}
       onClose = {props.onClose}
       isEdit={props.isEdit}
       selectedRow={props.selectedRow} 
       edited={props.edited}
       changeEdit={props.changeEdit}
       />
       )
      }
    else if(propsObj.title === "Add Meal Category"){
      return (
        <AddMealCategory
        isSave={isSave}
        isCancel={isCancel}
        changeSaveState={changeSaveState}
        changeCancelState={changeCancelState}
        setSaveButtonDisabled={setSaveButtonDisabled}
        saveButtonDisabled={saveButtonDisabled}
        onClose = {props.onClose}
        isEdit={props.isEdit}
        selectedRow={props.selectedRow} 
        edited={props.edited}
        setEdited={props.setEdited}
        />
      )
    }else if(propsObj.title === "Add Cuisine"){
      return(
      <AddCuisine 
        isSave={isSave}
        isCancel={isCancel}
        changeSaveState={changeSaveState}
        changeCancelState={changeCancelState}
        setSaveButtonDisabled={setSaveButtonDisabled}
        saveButtonDisabled={saveButtonDisabled}
        onClose = {props.onClose}
        isEdit={props.isEdit}
        selectedRow={props.selectedRow} 
        edited={props.edited}
        setEdited={props.setEdited}
      />
      )
    }     
  };
  const handleCancel = () => {
    setIsCancel(true);
    setSaveButtonDisabled(true);
    props.onClose();

  };

  const handleSave = () => {
    setIsSave(true)
    setSaveButtonDisabled(true)
  };

  
  const DrawerWidth = windowDimensions.width < 767 ? 300:470;
  
  return (
    <div>
      
     
      <Drawer
        title={props.title}
        width={DrawerWidth}
        onClose={handleCancel}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }} 
        destroyOnClose = {true} 
      >
        {getContainer(props)}
        <Buttons>
          <Cancel onClick={handleCancel}>CANCEL</Cancel>
          <Save disabled={saveButtonDisabled} onClick={handleSave}>
            SAVE
          </Save>
        </Buttons>
      </Drawer>
    </div>
  );
};

// const mapDispatchToProps = {
//   submitMeal,
//   addBankDetails
// };

DrawerForm.propTypes = {
  title: PropTypes.string,
  selectedbank: PropTypes.object,
  selectedRow: PropTypes.object,
  // addBankDetails: PropTypes.func,
  // submitMeal: PropTypes.func,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
}

DrawerForm.defaultProps = {
  disabled: true,
  onClick: () => {},
}

export default DrawerForm;
