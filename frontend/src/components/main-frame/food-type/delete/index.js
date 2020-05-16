import React from "react";
import {Popconfirm} from "antd";
import { Wrapper,Edit,InnerWrapper } from "./style"
const OnEditDelete = (props) => {

  return (<Wrapper> <InnerWrapper>
    <Edit onClick={() => props.handleEdit()}>
  <img src="./assets/edit-meal.svg" />
  </Edit>
    <Popconfirm
    title="Are you sure delete this type?"
    onConfirm={
      // props.deleteFoodGroup(selectedRow)
      ()=>props.deleteFoodType()
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