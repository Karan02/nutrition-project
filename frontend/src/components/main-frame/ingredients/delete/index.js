import React from "react";
import {Popconfirm} from "antd";
import { Wrapper,Edit,InnerWrapper } from "./style"
const OnEditDelete = (props) => {
 
  return (<Wrapper><InnerWrapper>
    <Edit onClick={() => props.editIngredient()}>
  <img src="./assets/edit-meal.svg" />
  </Edit>
     <Popconfirm
    title="Are you sure delete this Ingredient?"
    onConfirm={
      // props.deleteFoodGroup(selectedRow)
      ()=>props.deleteIngredient()
    }
    // onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <img className="image-button" src="./assets/trash-meal.svg" />
  </Popconfirm>
  
  </InnerWrapper>
  </Wrapper>)
}

export default OnEditDelete