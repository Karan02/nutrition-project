import React,{useState,useEffect} from "react";
import {Input,Select,Checkbox} from "antd";
import {connect} from "react-redux";
import {Toppings,Labels,LabelLeft} from "./style";
import {submitIngredient} from "../../../../reducers/ingredients";
import { FlexDisplay } from "../../meal/drawer/add-meal/style";

const { Option } = Select

const AddIngredients = (props) => {

  const [ingredientName,setIngredientName] = useState("");
  const [selectedGroup,setSelectedGroup] = useState([]);
  const [selectedType,setSelectedType] = useState("");
  const [toppings,setToppings] = useState(false);
  const [cups,setCups] = useState("");
  const [tablespoons,setTablespoons] = useState("");
  const [gmPerCup,setgmPerCup] = useState("");
  const [gmPerTableSpoon,setGmPerTableSpoon] = useState("");
  const [servingSize,setServingSize] = useState("");
  const [servingOunces,setServingOunces] = useState("");
  const [servingMiliLiters,setServingMiliLiters] = useState("");
  const [cupsgrams,setCupsgrams] = useState("");
  const [servingsgrams,setServingsgrams] = useState("");
  useEffect(()=> {
    return componentMountUnMount();
  })

  const handleChangeIngredientName = (e) => {
    setIngredientName(e.target.value);
  }

  const handleGroupChange = (value,option) => {
    // console.log("value",value,"option",option)
    setSelectedGroup(option.props.children)
    setSelectedType([])
  }

  const handleSelectChange = (value,option) => {
    setSelectedType(option.props.children)
  }

  const changeRadio = () => {
    setToppings(!toppings)
  }


  const componentMountUnMount = () => {
    if(props.isSave){
      
      
     
      
      const IngredientObject = {
          "ingredient": ingredientName,
          "foodGroup": selectedGroup,
          "foodType": selectedType,
          "toppings": toppings,
          "cups": cups,
          "tablespoons": tablespoons,
          "gramPerCup": gmPerCup,
          "gramPerTbsp":gmPerTableSpoon,
          "servingSize": servingSize,
          "servingOunces": servingOunces,
          "servingMl": servingMiliLiters,
          "servingsgrams":servingsgrams,
          "cupsgrams":cupsgrams
      }
      props.submitIngredient(IngredientObject,props.isEdit,props.selectedRow._id)
      // props.submitFoodGroup(name,props.isEdit,props.selectedRow._id);
      setIngredientName("");
      setSelectedGroup([]);
      setSelectedType([]);
      setToppings(false);
      setCups("");
      setTablespoons("");
      setgmPerCup("");
      setGmPerTableSpoon("");
      setServingSize("");
      setServingOunces("");
      setServingMiliLiters("");
      setCupsgrams("");
      setServingsgrams("");
      props.changeSaveState(false);
      props.onClose();
    }
    if(props.isCancel){
    
      setIngredientName("");
      setSelectedGroup([]);
      setSelectedType([]);
      setToppings(false);
      setCups("");
      setTablespoons("");
      setgmPerCup("");
      setCupsgrams("");
      setServingsgrams("");
      setGmPerTableSpoon("");
      setServingSize("");
      setServingOunces("");
      setServingMiliLiters("");
      props.changeCancelState();
      props.onClose();
    
    
  }
  }
  if(props.isEdit && props.selectedRow.ingredient !== ingredientName && !props.edited){ 
    // setName(props.selectedRow);
     
     setIngredientName(props.selectedRow.ingredient);
      setSelectedGroup(props.selectedRow.foodGroup);
      setSelectedType(props.selectedRow.foodType);
      setToppings(props.selectedRow.toppings);
      setCups(props.selectedRow.cups);
      setTablespoons(props.selectedRow.tablespoons);
      setgmPerCup(props.selectedRow.gramPerCup);
      setGmPerTableSpoon(props.selectedRow.gramPerTbsp);
      setServingSize(props.selectedRow.servingSize);
      setServingOunces(props.selectedRow.servingOunces);
      setServingMiliLiters(props.selectedRow.servingMl);
      setCupsgrams(props.selectedRow.cupsgrams ? props.selectedRow.cupsgrams:0 );
      setServingsgrams(props.selectedRow.servingsgrams ? props.selectedRow.servingsgrams:0);
    props.setEdited(true)
  }


  const groupOptions = props.foodgroup.map(group => {
  return <Option key={group.name} value ={`${group._id}`}>{group.name}</Option>
  })

  const typeOptions = props.foodtype.map(type =>{
    if(type.group === selectedGroup) return <Option key={type.name} value ={`${type._id}`}>{type.name}</Option>
    else {
      return
    }
  })

  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  if(props.saveButtonDisabled && (!isEmptyOrSpaces(ingredientName)&& selectedGroup.length !== 0)){ props.setSaveButtonDisabled(false) }
  if(!props.saveButtonDisabled &&(isEmptyOrSpaces(ingredientName) || selectedGroup.length === 0)){ props.setSaveButtonDisabled(true) }
  // console.log("foodtype",props.foodtype);
  return(
    <div>
     <FlexDisplay>  <p>Enter Food Ingredient</p>
     <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
       <input type="text" onChange={handleChangeIngredientName} value={ingredientName} placeholder="Enter Food Ingredient" className="input-food-ingredient input-food-ingredients" />

 
     <FlexDisplay className="select-padding-top"> <p>Select Food Group</p>
     <label className="Asterisk">*</label></FlexDisplay>
        <Select className="select-padding" value={selectedGroup} onChange={handleGroupChange} placeholder={"Select Food Group"} style={{width: "100%"}}>
        {groupOptions}
      </Select>
      <FlexDisplay className="select-padding-top"><p>Select Food Type</p>
      <label className="Asterisk">*</label></FlexDisplay>
      <Select className="select-padding" value={selectedType === "" ? []:selectedType} onChange={handleSelectChange} placeholder={"Select Food Type"} style={{width: "100%"}}>
        {typeOptions}
      </Select>
         <FlexDisplay>  <p>Enter 1 cup grams</p>
     <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
       <input type="number" min="0" onChange={(e)=> {setServingsgrams(e.target.value)}} value={servingsgrams}  placeholder="Enter grams" className="input-food-ingredient input-food-ingredients" />
       <FlexDisplay>  <p>Enter 1 cup serving</p>
     <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
       <input type="number" min="0" onChange={(e)=> {setCupsgrams(e.target.value)}} value={cupsgrams} placeholder="Enter grams" className="input-food-ingredient input-food-ingredients" />
   

      <Toppings>
      <Checkbox defaultChecked={toppings} onChange={changeRadio}>Toppings</Checkbox>
      </Toppings>
      
    </div>
  );
}
const MapState = state => ({
  state: state,
  foodgroup: state.foodgroup.foodGroup,
  foodtype: state.foodtype.foodtype
})

const MapDispatch = {
  submitIngredient,
}

export default connect(MapState,MapDispatch)(AddIngredients);