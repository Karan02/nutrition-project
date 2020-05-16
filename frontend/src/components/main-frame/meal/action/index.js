import React from "react";
import { Popconfirm } from "antd";
import { EditImage,DeleteImage } from "./style";
import PropTypes from 'prop-types';
// class EditDelete extends React.Component{
const EditDelete = (props) => {
  return (
    <div>
      {/* <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={props.handleEdit}> */}
        <EditImage onClick={props.handleEdit}>
          <img src="./assets/edit-meal.svg" />
        </EditImage>
      {/* </Popconfirm> */}
      <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={props.handleDelete}>
        <DeleteImage>
          <img src="./assets/trash-meal.svg" />
        </DeleteImage>
      </Popconfirm>
    </div>
  );
};

EditDelete.propTypes = {
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
}

EditDelete.defaultProps = {
  title:"",
  okText: "OK",
  cancelText: "Cancel",
  onConfirm:() => {},
}

export default EditDelete;
