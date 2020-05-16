import React, { useState,useEffect } from "react"
import { Wrapper,FoodTypeTitle,FlexDisplay } from "./style"
import {Input,Button,Select} from "antd"
import { connect } from "react-redux"
import { submitFoodType } from "../../../../reducers/foodtype";
const { Option } = Select;

const FoodType = (props) => {
  const [selected,setSelected] = useState([])
  // const [groupID,setgroupID] = useState("")
  const [groupName,setgroupName] = useState("")
  const [name,setName] = useState("")
  
  const options = props.foodgroups.map( (foodgroup,index) => <Option label={foodgroup._id} value={foodgroup.name} key={index}>{foodgroup.name}</Option>)
  useEffect(() => {
    return componentMountUnMount();
  })


  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }

  const checkSaveDisability = () => {
    if((isEmptyOrSpaces(name) || selected.length === 0) && (props.saveButtonDisabled !== true) ) props.setSaveButtonDisabled(true)
    if(props.saveButtonDisabled !== false && (!isEmptyOrSpaces(name)&& selected.length !== 0)){props.setSaveButtonDisabled(false)}
  }

  const handleChange = (value,option) => {
    
    setSelected(value)
    // setgroupID(option.props.label)
    setgroupName(option.props.children)   
  }
  const clearSelected = () => {
    
    setSelected([])
  }
  const handleChangeInput = (e) => {
    setName(e.target.value)
  }

  const componentMountUnMount = () => {
    if(props.isSave){
      props.submitFoodType(name,
        // groupID,
        groupName,props.isEdit,props.selectedRow);
      setName("");
      setgroupName("");
      // setgroupID("");
      setSelected([])
      props.changeSaveState(false);
      props.onClose();
    }
    if(props.isCancel){
      setName("");
      setgroupName("");
      // setgroupID("");
      setSelected([])
      props.changeCancelState();
      props.onClose();      
    }
    if(!props.edited && props.isEdit){
      // setgroupName(props.selectedRow.group ? props.selectedRow.group.groupName:null)
      setgroupName(props.selectedRow.group ? props.selectedRow.group:null)
      // setgroupID(props.selectedRow.group ? props.selectedRow.group.groupID:null)
      setName(props.selectedRow.name)
      props.changeEdit(true)
      setSelected(props.selectedRow.group)
      options.map((option,index) => {
        if(props.selectedRow.group === option.props.label){
          
           setSelected(props.selectedRow.group)
        }else {
          return false
        }
      })

      
    }
  }

 

  checkSaveDisability();
  return(
    <Wrapper>
      <FlexDisplay><p>Select Food Type</p>
      <label className="Asterisk ">*</label></FlexDisplay>
      <input  placeholder="Enter Food Type" value={name} onChange={handleChangeInput} className="input-food-type" />
      
      <FlexDisplay className="select-padding-top"><p>Select Food Group</p>
      <label className="Asterisk ">*</label></FlexDisplay>
      <Select
        showSearch
        // value={this.state.value}
        placeholder="Select Food Group"
        style={{ width: 400 }}
        // style={this.props.style}
        defaultActiveFirstOption={true}
        // showArrow={false}
        // filterOption={false}
        // onSearch={this.handleSearch}
        onChange={handleChange}
        // notFoundContent={null}
        value={selected}
        className="select-food-type"
        // defaultValue={selected}
      >
        {options}
      </Select>
    </Wrapper>
  );

}

const mapState = state => ({
  state: state,
  foodgroups: state.foodgroup.foodGroup
})

const mapDispatch = {
  submitFoodType
}

export default connect(mapState,mapDispatch)(FoodType)