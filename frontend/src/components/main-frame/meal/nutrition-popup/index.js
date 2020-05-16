import React, { useState,useEffect } from "react";
import Chart from "react-google-charts";
import { Modal, Button, Input, Checkbox, Spin,Table } from "antd";
import { PieChart, SubmitButton,Calories } from "./style";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getNutrient} from "../../../../reducers/nutrients";
let count = 0
const NutrientPopup = props => {
  const [row,setRow] = useState(true) 
  
  
  
  const nutrientObj = props.nutrient
  

  const getData = () => {
  if(props.visible  && row && count === 0){
    setRow(false)
    props.setGotNutrients(true);
    props.getNutrient(props.selectedRow._id);
}
  }
 

  const columns = [
    {title:"INGREDIENTS",
    dataIndex:"label",
    key:"1",
    render:(label,index) => <p key={index}>{label}</p>
  },
  {title:"QUANTITY",
    dataIndex:"weight",
    key:"2",
    render:(weight,index) => <p key={index}>{weight}</p>
  },
  {title:"% DAILY VALUE",
    dataIndex:"percentage",
    key:"3",
    render:(percentage,index) => <p key={index}>{percentage}</p>
  }
  ]

  const handleCancel = () => {
    props.handleCancel()
    setRow(true)
  }
  getData();

 
  return (
    
    <Modal
      title="NUTRIENT"
      visible={props.visible}
      onCancel={handleCancel}
      width={"700px"}
      // onOk={handleOk}
      destroyOnClose={true}
    ><Spin spinning={props.loading.get} tip="Loading Nutrients...">
      {props.nutrient.message ? <Calories>No Nutriental values available</Calories> :  (props.nutrient ?<Calories>Total Calories: {`${props.calories}`}</Calories>:null) }
      <PieChart>
        {/* <Chart
          chartType="PieChart"
          data={nutrientArray}
          options={options}
          width="100%"
          height="340px"
          className="piechart"
          loader={<div>loading...</div>}
        /> */}
       {props.nutrient ? <Table 
        className="nutrient-table"
        columns={columns}
        rowKey={"label"}
        dataSource={props.nutrient.message ? null:props.nutrient}
        columnWidth={"20px"}
        pagination={{pageSize: 15}}
        />:null}
      </PieChart>
      <div>
        <Checkbox>Do you see any issues?</Checkbox>
        <Input placeholder="Type here..." className="nutrient-suggestion" />
        <SubmitButton>
          <Button
            onClick={props.handleOk}
            className="nutrient-submit-to-admin"
            block
          >
            Submit to the Admin
          </Button>
        </SubmitButton>
      </div>
      </Spin>
    </Modal>
    
  );
};
NutrientPopup.propTypes = {
  handleOk: PropTypes.func,
  handleCancel:PropTypes.func,
  visible:PropTypes.bool,
  placeholder:PropTypes.string,
  className:PropTypes.string,
  onClick: PropTypes.func,
  onCancel: PropTypes.func,
  block: PropTypes.bool,
  title: PropTypes.string,
  visible: PropTypes.bool,
}
NutrientPopup.defaultProps = {
  placeholder:"",
  className:"",
  onClick:() => {},
  block: false,
  title:"",
  visible:false,
  onCancel: () => {},
}

const MapDispatch = {
  getNutrient
}
const MapState = state => ({
  loading:state.nutrient.loading,
  nutrient:state.nutrient.data,
  calories:state.nutrient.calories,

  
})
export default connect(MapState,MapDispatch)(NutrientPopup);
