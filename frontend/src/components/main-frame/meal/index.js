import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Modal,
  Button,
  Input,
  Icon,
  Table,
  Pagination,
  Checkbox,
  Spin,
  Select
} from "antd";
import {
  Head,
  MealHeaderText,
  ImportImage,
  ImportText,
  ImportFromXl,
  ExportImage,
  ExportFromXl,
  AddMeal,
  ImportButton,
  Buttons,
  ExportButton,
  Footer,
  Wrapper,
  EditImage,
  FooterResults,
  HighlightResults,
  MealImage,
  MealName
} from "./style";
import EmptyImage from "../../common/empty-image";
import EditDelete from "./action/index";
import Chart from "react-google-charts";
import NutrientPopup from "./nutrition-popup";
import UpdateMealPopup from "./update-meal-popup/index";
import DrawerForm from "../../common/drawer";
import { getMeal, deleteMeal } from "../../../reducers/meal";
import PropTypes from "prop-types";
import { changePageNumber,handleDownload,searchMeal,setSearch } from "../../../reducers/meal";
import { getMealCategories } from "../../../reducers/mealcategories";
import { getIngredients } from "../../../reducers/ingredients";
import { getCuisine } from "../../../reducers/cuisine";
import { createRestaurant } from "../../../../../backend/app/controller/helper/db-queries";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(
    //   `selectedRowKeys: ${selectedRowKeys}`,
    //   "selectedRows: ",
    //   selectedRows
    // );
  },
  getCheckboxProps: record => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name
  })
};

const Meal = props => {
  const [visibleNutrient, setVisibleNutrient] = useState(false);
  const [visibleMeal, setVisibleMeal] = useState(false);
  const [addMeal, setaddMeal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [gotNutrients,setGotNutrients] = useState(false);
  const [selectedRows,setSelectedRows] = useState(null);
  const [disableImport,setDisableImport] = useState(true);
  // const [search,setSearch] = useState("");
  useEffect(() => {
    props.getIngredients();
    
    props.getMeal();
    props.getMealCategories();
    props.getCuisine();
  }, []);
  const showDrawer = () => {
    setaddMeal(true);
  };
  const onCloseDrawer = () => {
    setaddMeal(false);
    setIsEdit(false);
    setSelectedRow({});
  };
  const showModal = () => {
    if(!selectedRow) return;
    setVisibleNutrient(true);
  };
  const handleCancelNutrient = e => {
    setGotNutrients(false)
    setVisibleNutrient(false);
  };
  const handleCancelMeal = () => {
    
    setVisibleMeal(false);
  };
  const slicer = text => {
    const slicedText = text ? text.slice(0, 10) : null;
    return slicedText;
  };
  const handleDelete = () => {
    props.deleteMeal(selectedRow);
  };
  const handleEdit = () => {
    setaddMeal(true);
    setIsEdit(true);
  };
  const handleSearch = (value) => {
    console.log("handle search",handleSearch)
    if(value !== ""){
      props.setSearch(value)
      props.changePageNumber(1);
      props.searchMeal(1)
    }
    if(value == ""){
      props.changePageNumber(1);
      props.getMeal()
      props.setSearch(value)
    };
    
  }
  const columns = [
    
    {
      title: "ITEM",
      dataIndex: "imageURL",
      key: "1",
      width:100,
      fixed: 'left',
      render: url => (
        <MealImage>
          <img src={url} className="meal-images" />
        </MealImage>
      )
    },
    {
      title: "NAME",
      dataIndex: "mealName",
      key: "2",
      // width: "50px",
      width:150,
      fixed: 'left',
      
      render: name => <MealName>{name}</MealName>
    },
    {
      title: "RESTAURANT NAME",
      dataIndex: "restaurant",
      key: "3",
      width:150,
      // width: "20%",
      render: restaurant => {
      if (restaurant.length > 0) {
        return <p className="date">{restaurant[0].name}</p>
      }
      return
    }
    },
    {
      title: "INGREDIENTS",
      dataIndex: "ingredients",
      key: "4",
      width: 200,
      render: ingredient =>{
      let names = []
      ingredient.forEach(individual =>{
        names.push(individual.ingredientsName)
      })
      return names.join(", ")  
      }
    },
    {
      title: "CUISINE",
      dataIndex: "mealCuisine",
      key: "5",
      width: 100,
      render: cuisine => <p>{cuisine}</p>
    },
    {
      title: "MEAL CATEGORY",
      dataIndex: "mealCategory",
      key: "6",
      width:150,
      // width: "30%",
      render: type =>{
        if(type) return <p>{type}</p>
        
        return ''
      }
    },
    {
      title: "MEAL SIZE",
      dataIndex: "mealSize",
      key: "7",
      width:150,
      // width: "30%",
      render: size => <p>{size}</p>
    },
    {
      title: "MEAL QUANTITY",
      dataIndex: "mealQuantity",
      key: "8",
      width:150,
      // width: "20%",
      render: mealQuantity => <p>{mealQuantity}</p>
    },
    {
      title: "MEAL PRICE",
      dataIndex: "mealPrice",
      key: "9",
      width:150,
      // width: "20%",
      render: mealPrice => <p>{mealPrice}</p>
    },
    
    {
      title: "NUTRIENT CONTENT",
      dataIndex: "nutrient",
      key: "10",
      width: 150,
      render: () => (
       
        <div>
          
          <Button
            size={"default"}
            onClick={showModal}

            className="view-nutrient-button"
          >
            View Nutrient
          </Button>
          {visibleNutrient ? <NutrientPopup
            visible={visibleNutrient}
            handleCancel={handleCancelNutrient}
            handleOk={handleCancelNutrient}
            selectedRow={selectedRow}
            setGotNutrients={setGotNutrients}
            gotNutrients={gotNutrients}
          />:null}
        </div>
      )
    },
    {
      title: "CREATED AT",
      dataIndex: "createdAt",
      key: "11",
      width:150,
      // width: "20%",
      render: text => <p className="date">{slicer(text)}</p>
    },
    {
      title: "EDITED AT",
      dataIndex: "editedAt",
      key: "12",
      width:150,
      // width: "20%",
      render: text => <p className="date">{slicer(text)}</p>
    },
   
    {
      title: "ACTION",
      dataIndex: "action",
      key: "13",
      width:150,
      // width: "20%",
      render: () => (
        <EditDelete handleDelete={handleDelete} handleEdit={handleEdit} />
      )
    }
  ];
  const { Search } = Input;

  const getContainer = () => {

    if (props.meals.length === 0) {
      
      return( <div>
        <Search  
        placeholder="Search Restaurant Name"
        allowClear 
        
        onSearch={value => {
         handleSearch(value)
        }
      }
        onChange={(e) => null}
        
        className="restaurantSearch"
      />
      <EmptyImage text={"No Meals available. Please add your Meal"} /></div>);
    } else {
      return (
        <div>
        <Search  
          placeholder="Search Restaurant Name"
          allowClear 
          
          onSearch={value => {
           handleSearch(value)
          }
        }
          onChange={(e) => null}
          
          className="restaurantSearch"
        />
          <Table
            columns={columns}
            dataSource={props.meals}
            rowSelection={rowSelection}
            pagination={false}
            scroll={{ x: '160%'}}
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
          {getFooter()}
        </div>
      );
    }
  };

  const getFooter = () => {
    if(props.totalMeal > 9) {
      return (
        <Footer>
        <FooterResults>
      Displaying <HighlightResults>{props.meals.length}</HighlightResults> Out of{" "}
      <HighlightResults>{props.totalMeal}</HighlightResults>
    </FooterResults>
        <Pagination
          total={props.totalMeal}
          showTotal={(total, range) => `${range[0]}-${range[1]}`}
          pageSize={10}
          defaultCurrent={1}
          current={props.pageNumber}
          onChange={(pageNumber, pageSize) => {
            console.log("on change props.search",props.search)
            props.changePageNumber(pageNumber);
            props.search === "" ? props.getMeal() : props.searchMeal(props.search)
          }}
        />
      </Footer>
      )
    }
    return;
  };

  // console.log('selected row', selectedRow);
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setSelectedRows(selectedRows)
  //   },
  // };
  
  return (
    <Wrapper>
      
      <Spin tip="Loading Meals..." spinning={props.loading.getMeal || props.loading.submitMeal}>
        <div>
          <DrawerForm
            visible={addMeal}
            onClose={onCloseDrawer}
            showDrawer={showDrawer}
            title={"ADD MEAL"}
            isEdit={isEdit}
            selectedRow={selectedRow}
          />
        </div>
        <div>
          <UpdateMealPopup
            visible={visibleMeal}
            handleCancel={handleCancelMeal}
            handleOk={handleCancelMeal}
            selectedRow={selectedRow}
            disableImport={disableImport}
            setDisableImport={setDisableImport}
          />
        </div>

        <Head>
          <div>
            <MealHeaderText>Meals</MealHeaderText>
          </div>
          <Buttons>
            <ImportButton
              onClick={() => {
                setVisibleMeal(true);
              }}
            >
              <ImportImage>
                <img src="./assets/import.png" />
              </ImportImage>
              <ImportText>
                <ImportFromXl>Import from XL</ImportFromXl>
              </ImportText>
            </ImportButton>
            <ExportButton onClick={() => props.handleDownload(selectedRows)}>
              <ExportImage>
                <img src="./assets/export.png" />
              </ExportImage>

              <ExportFromXl>Export to XL</ExportFromXl>
            </ExportButton>
            <AddMeal onClick={showDrawer} className="add meal">
              + Add Meal
            </AddMeal>
          </Buttons>
        </Head>
        {getContainer()}
        
      </Spin>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  meals: state.meals.meals,
  loading: state.meals.loading,
  totalMeal: state.meals.totalMeal,
  search:state.meals.search,
  pageNumber:state.meals.pageNumber
});

const mapDispatchToProps = {
  getMeal,
  deleteMeal,
  changePageNumber,
  getIngredients,
  handleDownload,
  getMealCategories,
  getCuisine,
  searchMeal,
  setSearch
};

Meal.propTypes = {
  getMeal: PropTypes.func,
  changePageNumber: PropTypes.func,
  deleteMeal: PropTypes.func,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  rowSelection: PropTypes.func,
  pagination: PropTypes.bool,
  scroll: PropTypes.object,
  onRow: PropTypes.func,
  total: PropTypes.number,
  showTotal: PropTypes.func,
  pageSize: PropTypes.number,
  defaultCurrent: PropTypes.number,
  onClick: PropTypes.func
};

Meal.defaultProps = {
  onClick: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
