import React, { useState, useEffect } from "react";
import { Layout, Menu, Icon,Table,Spin,Checkbox,Pagination,Input } from "antd";
// import useStyles from 'isomorphic-style-loader/useStyles'
import { 
  Header,
  HeaderTitle,
  AddIngredient,
  Wrapper,
  ImportImage,
  ImportText,
  ImportFromXl,
  ExportImage,
  ExportFromXl,
  ImportButton,
  Buttons,
  ExportButton,
  FooterResults,
  Footer,
  HighlightResults } from "./style.js";
// import classNames from "classnames";
import { connect } from "react-redux";
import {getIngredients,deleteIngredient,handleDownload,changePageNumber,searchIngredients,setSearch} from "../../../reducers/ingredients";
import  DrawerForm  from "../../common/drawer/index";
import EmptyImage from "../../common/empty-image/index";
import OnEditDelete from "./delete/index";
import {getFoodGroup} from "../../../reducers/foodgroup";
import {getFoodType} from "../../../reducers/foodtype";
import UpdateIngredientPopup from "./update-ingredient-popup/index";


const Ingredients = (props) => {
  const [visible,setVisible] = useState(false);
  const [selectedRow,setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [edited, setEdited] = useState(false);
  const [visibleIngredient, setVisibleIngredient] = useState(false);
  useEffect(() => {
    props.getIngredients();
    props.getFoodGroup();
    props.getFoodType();
  },[]);

  const handleCancelIngredient = () => {
    setVisibleIngredient(false);
  };

  const handleSearch = (value) => {
    if(value !== ""){
      props.setSearch(value)
      props.changePageNumber(1);
      props.searchIngredients(1)
    }
    if(value == ""){
      props.setSearch(value)
      props.changePageNumber(1);
      props.getIngredients()};
    
  }
  const columns = [
    {
      title: "INGREDIENT",
      dataIndex: "ingredient",
      key: "1",
      width: 50,
      render: ingredient => (
        <p>{ingredient}</p>
      )
    },
    {
      title: "FOOD GROUP",
      dataIndex: "foodGroup",
      key: "2",
      width: 25,
      render: category => <p>{category}</p>
    },

    {
      title: "FOOD TYPE",
      dataIndex: "foodType",
      key: "3",
      width: 25,
      render: text => <p>{text}</p>
    },
    {
      title: "1 SERVINGS(gms)",
      dataIndex: "servingsgrams",
      key: "4",
      width:35,
      render: serving => <p>{serving ? serving.toFixed(2):null}</p>
    },
    {
      title: "1 CUPS(gms)",
      dataIndex: "cupsgrams",
      key: "5",
      width: 25,
      render: cup => <p>{cup ? cup.toFixed(2):null}</p>
    },
    {
      title: "TOPPINGS",
      dataIndex: "toppings",
      key: "6",
      width: 25,
      render: bool => <p><Checkbox checked={bool} disabled /></p>
    },
    // {
    //   title: "1 SERVING SIZE (# OF CUPS)",
    //   dataIndex: "cups",
    //   key: "5",
    //   width: 94,
    //   render: (cups) => (
    //     <p>{cups}</p>
    //   )
    // },
    // {
    //   title: "1 SERVING SIZE (# OF TBSP)",
    //   dataIndex: "tablespoons",
    //   key: "6",
    //   width: 90,
    //   render: (tbsp) => (
    //     <p>{tbsp}</p>
    //   )
    // },
    // {
    //   title: "GRAMS / CUP",
    //   dataIndex: "gramPerCup",
    //   key: "7",
    //   width: 90,
    //   render: (gmsCup) => (
    //     <p>{gmsCup}</p>
    //   )
    // },
    // {
    //   title: "GRAMS / TBSP",
    //   dataIndex: "gramPerTbsp",
    //   key: "8",
    //   width: 90,
    //   render: (gmsTbsp) => (
    //     <p>{gmsTbsp}</p>
    //   )
    // },
    // {
    //   title: "1 SERVING SIZE (GRAMS)",
    //   dataIndex: "servingSize",
    //   key: "9",
    //   width: 90,
    //   render: (gmsTbsp) => (
    //     <p>{gmsTbsp}</p>
    //   )
    // },
    // {
    //   title: "1 SERVING (OUNCES)",
    //   dataIndex: "servingOunces",
    //   key: "10",
    //   width: 90,
    //   render: (ounces) => (
    //     <p>{ounces}</p>
    //   )
    // },
    // {
    //   title: "1 SERVING (ML)",
    //   dataIndex: "servingMl",
    //   key: "11",
    //   width: 90,
    //   render: (ml) => (
    //     <p>{ml}</p>
    //   )
    // },
    {
      title: "ACTION",
      key: "7",
      width: 20,
      render: () => {
        return <OnEditDelete editIngredient={editIngredient} deleteIngredient={deleteIngredient} />
      }
    }
    
  ];
  
  const editIngredient = () => {
    setVisible(true);
    setIsEdit(true);
  
  }
  
  const deleteIngredient = () => {
    // console.log("SELECTED ROW",selectedRow._id)
    props.deleteIngredient(selectedRow._id);
  } 
  
  const getFooter = () => {
    if(props.totalIngredients > 9) {
      return (
        <Footer>
        <FooterResults>
        Displaying <HighlightResults>{props.ingredients.length}</HighlightResults> Out of{" "}
        <HighlightResults>{props.totalIngredients}</HighlightResults>
        </FooterResults>
        <Pagination
          total={props.totalIngredients}
          showTotal={(total, range) => `${range[0]}-${range[1]}`}
          pageSize={10}
          defaultCurrent={1}
          current={props.pageNumber}
          onChange={(pageNumber, pageSize) => {
            props.changePageNumber(pageNumber);
            props.search === "" ? props.getIngredients(): props.searchIngredients(props.search)
          }}
        />
      </Footer>
      )
    }
    return;
  };

  const onCloseDrawer = () => {
    setVisible(false);
    setIsEdit(false);
    setEdited(false);
  }
  const toggleDrawer = () => {
    setVisible(!visible);
  }
  const getContainer = () => {
    return props.ingredients.length > 0 ? <div><Table
    columns={columns}
    dataSource={props.ingredients}
    // rowSelection={rowSelection}
    pagination={false}
    scroll={{ x: 300 }}
    onRow={(record, index) => {
      return {
        onClick: event => {
          setSelectedRow(record);
        }
      };
    }}
    rowKey={record => {
      return record._id;
    }} 
    />{getFooter()}</div>:<div> <Input.Search  
    placeholder="Search Ingredients"
    allowClear 
    
    onSearch={value => { 
      handleSearch(value) 
    }
  }
    onChange={(e) => null}
    
    className="restaurantSearch"
  /><EmptyImage text="No Ingredients available, Please add Ingredients"/></div>

    
  }
  
  return(
    <Wrapper>
      <Spin tip="Loading Food Ingredients..." spinning={props.loading}>
      <DrawerForm
          
          onClose={onCloseDrawer}
          visible={visible}
          title={"Add Ingredients"}
          isEdit={isEdit}
          selectedRow={selectedRow}
          edited={edited}
          setEdited={setEdited}
        />
        <div>
          <UpdateIngredientPopup
            visible={visibleIngredient}
            handleCancel={handleCancelIngredient}
            handleOk={handleCancelIngredient}
          />
        </div>
      <Header>
        <HeaderTitle>Ingredients</HeaderTitle>
        <Buttons>
        <ImportButton
              onClick={() => {
                setVisibleIngredient(true);
              }}
            >
              <ImportImage>
                <img src="./assets/import.png" />
              </ImportImage>
              <ImportText>
                <ImportFromXl>Import from XL</ImportFromXl>
              </ImportText>
            </ImportButton>
            <ExportButton onClick={props.handleDownload}>
              <ExportImage>
                <img src="./assets/export.png" />
              </ExportImage>

              <ExportFromXl>Export to XL</ExportFromXl>
            </ExportButton>
        <AddIngredient onClick={toggleDrawer}>+ Add Ingredient</AddIngredient>
        </Buttons>
      </Header>
      <Input.Search  
          placeholder="Search Ingredients"
          allowClear 
          
          onSearch={value => { 
            handleSearch(value) 
          }
        }
          onChange={(e) => null}
          
          className="restaurantSearch"
        />
      {getContainer()}
      
      </Spin>
    </Wrapper>
  );
};

const mapState = state => ({
  ingredients: state.ingredients.ingredients,
  loading: state.ingredients.loading.ingredients,
  totalIngredients:state.ingredients.totalIngredients,
  search:state.ingredients.search,
  pageNumber:state.ingredients.pageNumber
})

const mapDispatch = {
  getIngredients,
  getFoodGroup,
  getFoodType,
  deleteIngredient,
  handleDownload,
  changePageNumber,
  searchIngredients,
  setSearch
}
export default connect(mapState,mapDispatch)(Ingredients);
