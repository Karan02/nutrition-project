import React, { useState, useEffect } from "react";
import { Wrapper, Header, HeaderTitle, HeaderButton, Content } from "./style";
import DrawerForm from "../../common/drawer/index";
import { connect } from "react-redux";
import { Popconfirm, Table, Spin } from "antd";
import { getFoodGroup,deleteFoodGroup } from "../../../reducers/foodgroup";
import OnEditDelete from "./delete/index";
import EmptyImage from "../../common/empty-image/index";

const FoodGroup = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  useEffect(()=> {
    props.getFoodGroup()
    return 
  },[])
  const columns = [
    {
      title: "FOOD GROUPS",
      dataIndex: "name",
      key: "1",
      width: "90%",
      render: name => <p>{name}</p>
    },
    {
      title: "ACTION",
      key: "2",
      width: "10%",
      render: () => {
        return (
          <OnEditDelete
            handleEdit={handleEdit}
            deleteFoodGroup={deleteFoodGroup}
          />
        );
      }
    }
  ];
  const onCloseDrawer = () => {
    setShowDrawer(false);
    setIsEdit(false);
    setEdited(false);
  };
  const deleteFoodGroup = () => {
    props.deleteFoodGroup(selectedRow);
  };
  const handleEdit = () => {
    setShowDrawer(true);
    setIsEdit(true);
    // setTimeout(() => {
    // console.log("row",row)
    // }, 3000);
  };

  const setEditedRecord = record => setSelectedRow(record);

  const setPagination = props.foodGroup.length > 10 ? true:false

  const getContainer = () => {
    
    return props.foodGroup.length > 0 ? (
      <Table
        columns={columns}
        dataSource={props.foodGroup}
        pagination={setPagination}
        // bordered
        // pagination={false}
        // scroll={{ x: 1135 }}
        rowKey={record => {
          return record._id;
        }}
        onRow={(record, index) => {
          return {
            onClick: event => {
              // console.log('on row click', record);
              setEditedRecord(record);
              // setSelectedRow(record);
            }
          };
        }}
      />
    ) : (
      <EmptyImage text="No Food Groups available, Please add Food Groups" />
    );
  };
  
  return (
    <Wrapper>
      <Spin tip="Loading Food Groups..." spinning={props.loading.get}>
        <DrawerForm
          onClose={onCloseDrawer}
          visible={showDrawer}
          title={"Add Food Group"}
          isEdit={isEdit}
          selectedRow={selectedRow}
          edited={edited}
          setEdited={setEdited}
        />
        <Header>
          <HeaderTitle>Food Group</HeaderTitle>
          <HeaderButton onClick={() => setShowDrawer(true)}>
            + Add Food Group
          </HeaderButton>
        </Header>
        <Content>{getContainer()}</Content>
      </Spin>
    </Wrapper>
  );
};
const mapState = state => ({
  foodGroup: state.foodgroup.foodGroup,
  loading: state.foodgroup.loading
});
const mapDispatch = {
  deleteFoodGroup,
  getFoodGroup
};
export default connect(mapState, mapDispatch)(FoodGroup);
