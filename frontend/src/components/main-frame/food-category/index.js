import React, { useState, useEffect } from "react";
import { Wrapper, Header, HeaderTitle, HeaderButton, Content,Footer, FooterResults,HighlightResults } from "./style";
import DrawerForm from "../../common/drawer/index";
import { connect } from "react-redux";
import { Popconfirm, Table, Spin,Pagination } from "antd";
// import { getFoodGroup,deleteFoodGroup } from "../../../reducers/foodgroup";
import {getMealCategories,deleteMealCategories,changePageNumber} from "../../../reducers/mealcategories";
import OnEditDelete from "./delete/index";
import EmptyImage from "../../common/empty-image/index";

const MealCategory = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  useEffect(()=> {
    props.getMealCategories()
    return 
  },[])
  
  const columns = [
    {
      title: "Meal Categories",
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
            deleteMealCategories={deleteMealCategories}
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
  const deleteMealCategories = () => {
    props.deleteMealCategories(selectedRow);
  };
  const handleEdit = () => {
    setShowDrawer(true);
    setIsEdit(true);
    // setTimeout(() => {
    // console.log("row",row)
    // }, 3000);
  };

  const setEditedRecord = record => setSelectedRow(record);

  // const setPagination = props.mealcategory.length > 10 ? true:false

  const getContainer = () => {
    
    return props.mealcategory.length > 0 ? (<div>
      <Table
        columns={columns}
        dataSource={props.mealcategory}
        pagination={false}
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
      /> {getFooter()} </div>
    ) : (
      <EmptyImage text="No Meal Categories available, Please add Meal Categories" />
    );
  };
  const getFooter = () => {
    if(props.totalCategories > 9) {
      return (
        <Footer>
          <FooterResults>
            Displaying <HighlightResults>{props.mealcategory.length}</HighlightResults> Out of{" "}
          <HighlightResults>{props.totalCategories}</HighlightResults>
          </FooterResults>
          
            <Pagination
              total={props.totalCategories}
              showTotal={(total, range) => {
                console.log("range",range)
                return `${range[0]}-${range[1]}`}}
              pageSize={10}
              defaultCurrent={1}
              // current={props.pageNumber}
              onChange={(pageNumber, pageSize) => {
                props.changePageNumber(pageNumber);
                // console.log("pageNumber",pageNumber)
                props.getMealCategories();
              }}
            />
        </Footer>
      )
    }
    return;
  };

  return (
    <Wrapper>
      <Spin tip="Loading Meal Categories..." spinning={props.loading.get}>
        <DrawerForm
          onClose={onCloseDrawer}
          visible={showDrawer}
          title={"Add Meal Category"}
          isEdit={isEdit}
          selectedRow={selectedRow}
          edited={edited}
          setEdited={setEdited}
        />
        <Header>
          <HeaderTitle>Meal Category</HeaderTitle>
          <HeaderButton onClick={() => setShowDrawer(true)}>
            + Add Meal Category
          </HeaderButton>
        </Header>
        <Content>{getContainer()}</Content>
      </Spin>
    </Wrapper>
  );
};
const mapState = state => ({
  mealcategory: state.mealcategory.mealCategory,
  loading: state.mealcategory.loading,
  totalCategories:state.mealcategory.totalCategories
});
const mapDispatch = {
  // deleteFoodGroup,
  deleteMealCategories,
  getMealCategories,
  changePageNumber
  // getFoodGroup
};
export default connect(mapState, mapDispatch)(MealCategory);
