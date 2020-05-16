import React, { useState, useEffect } from "react";
import { Wrapper, Header, HeaderTitle, HeaderButton, Content } from "./style";
import DrawerForm from "../../common/drawer/index";
import { connect } from "react-redux";
import { Popconfirm, Table, Spin } from "antd";
import { getCuisine,deleteCuisine } from "../../../reducers/cuisine";
import OnEditDelete from "./delete/index";
import EmptyImage from "../../common/empty-image/index";

const Cuisine = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  useEffect(()=> {
    props.getCuisine()
    return 
  },[])

  

  const columns = [
    {
      title: "CUISINE",
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
            deleteCuisine={deleteCuisine}
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
  const deleteCuisine = () => {
    props.deleteCuisine(selectedRow);
  };
  const handleEdit = () => {
    setShowDrawer(true);
    setIsEdit(true);
    // setTimeout(() => {
    // console.log("row",row)
    // }, 3000);
  };

  const setEditedRecord = record => setSelectedRow(record);
  
  const setPagination = props.cuisines.length > 10 ? true:false

  const getContainer = () => {
    
    return props.cuisines.length > 0 ? (
      <Table
        columns={columns}
        dataSource={props.cuisines}
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
      <EmptyImage text="No Cuisine available, Please add Cuisines" />
    );
  };
  
  return (
    <Wrapper>
      {/* {console.log("props.loading.get",props.loading.get)} */}
      <Spin tip="Loading Cuisines..." spinning={props.loading.get}>
        <DrawerForm
          onClose={onCloseDrawer}
          visible={showDrawer}
          title={"Add Cuisine"}
          isEdit={isEdit}
          selectedRow={selectedRow}
          edited={edited}
          setEdited={setEdited}
        />
        <Header>
          <HeaderTitle>Cuisine</HeaderTitle>
          <HeaderButton onClick={() => setShowDrawer(true)}>
            + Add Cuisine
          </HeaderButton>
        </Header>
        <Content>{getContainer()}</Content>
      </Spin>
    </Wrapper>
  );
};
const mapState = state => ({
  cuisines: state.cuisine.cuisines,
  loading: state.cuisine.loading
});
const mapDispatch = {
  getCuisine,
  deleteCuisine
};
export default connect(mapState, mapDispatch)(Cuisine);
