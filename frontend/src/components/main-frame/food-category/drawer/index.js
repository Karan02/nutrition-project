import React, { useState, useEffect } from "react";
import { Wrapper,AddTitle,FlexDisplay } from "./style";
import { Input,Button } from "antd";
import {connect} from "react-redux";
import { submitMealCategories } from "../../../../reducers/mealcategories";

const AddMealCategory = (props) => {
  const [name,setName] = useState("");
  
  useEffect(() => {
    return componentMountUnMount();
  })
  const handleChange = (e) => {
    setName(e.target.value)
    if(isEmptyOrSpaces(e.target.value)) props.setSaveButtonDisabled(true)
    else props.setSaveButtonDisabled(false)

  }
  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  const componentMountUnMount = () => {
  if(props.isSave){
    props.submitMealCategories(name,props.isEdit,props.selectedRow._id);
    setName("");
    props.changeSaveState(false);
    props.onClose();
  }
  if(props.isCancel){
   
    setName("");
    props.changeCancelState();
    
    
  }
}
  if(props.isEdit && props.selectedRow.name !== name && !props.edited){ 
    setName(props.selectedRow.name);
    props.setEdited(true)
  }
  
  return(
    <Wrapper>
      {/* <AddTitle>Add Food Group:</AddTitle> */}
      <FlexDisplay>
      <p>Add Meal Category</p>
      <label className="Asterisk AsteriskSpecial">*</label></FlexDisplay>
      <input type="text" value={name} placeholder="add meal category..." className="input-group" onChange={handleChange} />
      
      {/* <Button className="submit-food-group">Submit</Button> */}
    </Wrapper>
  );
}

const MapDispatch = {
  submitMealCategories,
}
export default connect(null,MapDispatch)(AddMealCategory)