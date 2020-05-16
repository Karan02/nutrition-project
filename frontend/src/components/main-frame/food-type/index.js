import React, { useState,useEffect } from "react";
import { Wrapper, Header, HeaderTitle, HeaderButton, Content } from "./style";
import DrawerForm from "../../common/drawer/index";
import { Table, Spin } from "antd";
import OnEditDelete from "./delete/index";
import { connect } from "react-redux";
import { getFoodType,deleteFoodType } from "../../../reducers/foodtype";
import EmptyImage from "../../common/empty-image/index";
import {getFoodGroup} from "../../../reducers/foodgroup.js";

const FoodType = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    
    props.getFoodType();
    props.getFoodGroup();
    return
  },[])
  const onCloseDrawer = () => {
    setShowDrawer(false);
    setIsEdit(false);
    setEdited(false);
  };
  const columns = [
    {
      title: "FOOD TYPES",
      dataIndex: "name",
      key: "1",
      width: "40%",
      render: name => <p>{name}</p>
    },
    {
      title: "FOOD GROUPS",
      dataIndex: "group",
      key: "2",
      width: "50%",
      render: group => <p>{group}</p>
    },
    {
      title: "ACTION",
      key: "3",
      width: "10%",
      render: () => {
        return (
          <OnEditDelete
            handleEdit={handleEdit}
            deleteFoodType={deleteFoodType}
          />
        );
      }
    }
  ];
  const changeEdit = value => {
    setEdited(value);
  };
  const deleteFoodType = () => {
    props.deleteFoodType(selectedRow);
  };
  const handleEdit = () => {
    setShowDrawer(true);
    setIsEdit(true);
    // setTimeout(() => {
    // console.log("row",row)
    // }, 3000);
  };
  const setPagination = props.foodtype.length > 10 ? true:false
  const getContainer = () => {
    return props.foodtype.length > 0 ? (
      <Table
        columns={columns}
        dataSource={props.foodtype}
        // bordered
        pagination={setPagination}
        // scroll={{ x: 1135 }}
        rowKey={record => {
          return record._id;
        }}
        onRow={(record, index) => {
          return {
            onClick: event => {
              setSelectedRow(record);
            }
          };
        }}
      />
    ) : (
      <EmptyImage text="No Food Types available, Please add Food Types" />
    );
  };

  return (
    <Wrapper>
      <Spin tip="Loading Food Types..." spinning={props.loading.get || props.loading.update}>
        <DrawerForm
          onClose={onCloseDrawer}
          visible={showDrawer}
          title={"Add Food Type"}
          isEdit={isEdit}
          selectedRow={selectedRow}
          edited={edited}
          changeEdit={changeEdit}
        />
        <Header>
          <HeaderTitle>Food Type</HeaderTitle>
          <HeaderButton onClick={() => setShowDrawer(true)}>
            + Add Food Type
          </HeaderButton>
        </Header>
        <Content>{getContainer()}</Content>
      </Spin>
    </Wrapper>
  );
};
const mapState = state => ({
  foodtype: state.foodtype.foodtype,
  loading: state.foodtype.loading
});

const mapDispatch = {
  deleteFoodType,
  getFoodType,
  getFoodGroup
};
export default connect(mapState, mapDispatch)(FoodType);
