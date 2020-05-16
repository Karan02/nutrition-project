import React, { useState, useEffect } from "react";
import {
  Section,
  Labels,
  Inputs,
  FlexDisplay,
  Dustbin,
  DisplayFlex,
  Buttons,
  Cancel,
  Save,
  RelativePosition
} from "./style";
import { Input, Select,Spin } from "antd";
import PropTypes from 'prop-types';
const { Option, OptGroup } = Select;
import {connect} from "react-redux";
import { getIngredientsInMeals } from "../../../../../../reducers/meal";

const Container = props => {
  const [ingredientsName, setingredientsName] = useState("");
  const [qty, setqty] = useState(1);
  const [container, setContainer] = useState("serving");
  const [saveButton, setsaveButton] = useState(true);
  const [ingredientsSelect,setingredientsSelect] = useState("");
  const [selectedIngredientId,setSelectedIngredientId] = useState("");
  const [numOfScroll,setnumOfScroll] = useState(1);
  const [scrollvalue,setScrollValue] = useState(0);
  useEffect(() => {
    if (
      qty !== 0 &&
      container !== "Select" &&
      ingredientsName !== "" &&
      saveButton === true
    )
      setsaveButton(false);
    if (qty === 0 || container === "Select" || ingredientsName === "")
      setsaveButton(true);
  }, [ingredientsName, qty, container]);

  useEffect(( )=>{
    props.getIngredientsInMeals(10)
  },[]) 
  
  const handleSave = () => {
    const ingredient = {
      ingredientsName: ingredientsName,
      quantity: qty,
      container: container,
      selectedIngredientId: selectedIngredientId
    };
    props.pushIngredients(ingredient);
    setingredientsName("");
    setingredientsSelect("");
    setqty(1);
    setContainer("serving");
    setSelectedIngredientId("");
    setsaveButton(true);
    props.setInEditProcess(false);
    props.onClose();
  };

  const handleClose = () => {
    setnumOfScroll(1)   
    setScrollValue(0)     
    if(Object.entries(props.selectedIngredientIntermediate).length !== 0) props.pushIngredients(props.selectedIngredientIntermediate);
    props.resetselectedIngredientIntermediate();
    props.setInEditProcess(false)
    props.onClose();
    
  }
  if(!(Object.entries(props.selectedIngredient).length === 0)){
    if(qty !== props.selectedIngredient.quantity || 
      ingredientsName !== props.selectedIngredient.ingredientsName || 
      container !== props.selectedIngredient.container){
        setqty(props.selectedIngredient.quantity);
        setContainer(props.selectedIngredient.container);
        setingredientsName(props.selectedIngredient.ingredientsName);
        setingredientsSelect(props.selectedIngredient.ingredientsName);
        // check for this below line if error occurs
        setSelectedIngredientId(props.selectedIngredient.selectedIngredientId);
        props.deleteSelectedIngredients();
    }
  }
  
  
  const options = props.ingredientList.map(ingredient => {
  return <Option label={ingredient._id} value={ingredient.ingredient} key={ingredient.ingredient}>{ingredient.ingredient}</Option>
  })
  
  // console.log("props.loading.ingredients",props.loading.ingredients)
  // if(props.loading.ingredients) options.push(<Option key={"spin"}><Spin style={{position:"absolute",top:"-59x"}} spinning={props.loading.ingredients}> </Spin></Option>)
  const handleScroll = (e) =>{
      // console.log("e",e.target.clientTop,e.target.offsetTop,e.target.scrollHeight,e.target.offsetHeight,e.target.clientHeight,e.target.scrollTop)
      const isEndOfList = e.target.scrollTop + e.target.clientHeight;
      if (isEndOfList === e.target.scrollHeight ) { 
        // console.log("here1",e.target.scrollTop,scrollvalue)
      if (e.target.scrollTop !== scrollvalue){
        // console.log("here2",e.target.scrollTop,scrollvalue)
        let value = e.target.scrollTop
        setnumOfScroll(numOfScroll + 1) 
        setScrollValue(value)
        props.getIngredientsInMeals((numOfScroll + 1)*10)
      }
    }
  }
  // console.log("ingredientList",props.ingredientList)
  return (
    <Section>
      <DisplayFlex>
        <Inputs>
          {/* <Input
            placeholder="Type your ingredients"
            value={ingredientsName}
            onChange={e => {
              setingredientsName(e.target.value);
            }}
          /> */}
          <FlexDisplay className="select-ingredient">
            <Labels>Select your ingredients</Labels>
            <label className="Asterisk">*</label></FlexDisplay>
            <RelativePosition>
            <Spin style={{position:"absolute",bottom:"0"}} spinning={props.loading.ingredients}> 
          <Select placeholder="Select your ingredients"
            value={ingredientsSelect === "" ? [] : ingredientsSelect}
            className="quantity"
            onPopupScroll={handleScroll}
            onChange={(value,option) => {
            
              setSelectedIngredientId(option.props.label)
              setingredientsSelect(value);
              setingredientsName(value);
            }}>
              {options}
            </Select>
            </Spin>
            </RelativePosition>
          <FlexDisplay>
            <div>
             
              <FlexDisplay className="select-ingredient">
              <Labels>Qty</Labels>
              <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
              <Input
                defaultValue={1}
                value={qty === 0 ? []:qty}
                onChange={e => {
                  setqty(e.target.value);
                }}
                type="number"
                style={{ width: 60 }}
                placeholder="0"
                className="qty"
                min="0"
               />
                {/* <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
              </Select> */}
            </div>
            <div>
              
              <FlexDisplay className="select-ingredient">
              <Labels>Units</Labels>
              <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
              <Select
                value={container}
                onChange={e => {
                  setContainer(e);
                }}
                style={{ width: 150 }}
                // placeholder="Select"
                className="container"
              > 
                <Option value="serving">serving</Option>
                <Option value="cup">cup</Option>
                <Option value="tablespoon">tablespoon</Option>
                <Option value="grams">grams</Option>
                <Option value="ounces">ounces</Option>
                <Option value="ml">ML</Option>
                <Option value="Others">Others</Option>
              </Select>
              {/* <Input value={container} onChange={e => {
                setContainer(e.target.value)
              }} /> */}
            </div>
          </FlexDisplay>
        </Inputs>
        <Dustbin disabled={props.inEditProcess} onClick={props.onClose}>
          <img src="./assets/closemealdrawer.svg" />
        </Dustbin>
      </DisplayFlex>
      <Buttons>
        <Cancel onClick={handleClose} >CANCEL</Cancel>
        <Save disabled={saveButton} onClick={handleSave}>
          SAVE
        </Save>
      </Buttons>
    </Section>
  );
};

Container.propTypes = {
  pushIngredients: PropTypes.func,
  selectedIngredient: PropTypes.object,
  selectedIngredientIntermediate: PropTypes.object,
  resetselectedIngredientIntermediate: PropTypes.func,
  onClose: PropTypes.func,
  deleteSelectedIngredients: PropTypes.func,

}

Container.defaultProps = {
  onClick: () => {},
  disabled: true,
  value:"",
  placeholder: "",
  onChange: () => {},
}

const mapState = state => ({ 
  ...state.meals,
 totalIngredients:state.ingredients.totalIngredients
 })

const mapDispatch = {
  getIngredientsInMeals
}



export default connect(mapState,mapDispatch)(Container);
