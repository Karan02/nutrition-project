import React, { useState, useEffect } from "react";
import { Form, Input,Select } from "antd";
import { IngredientsAdd, Ingredients, AddButton,FlexDisplay,QuantityMid,QuantityWidth } from "./style.js";
import Container from "./container/index";
import IngredientsList from "./ingredients/index";
import PropTypes from 'prop-types';
import { submitMeal } from "../../../../../reducers/meal";
import { connect } from "react-redux";
import { Quantity } from "./ingredients/style.js";

const AddMeal = props => {
  const [ingredientVisible, setingredientVisible] = useState(false);
  const [selectedIngredientIntermediate, setselectedIngredientIntermediate] = useState({});
  const [listOfIngredients, setlistOfIngredients] = useState([]);
  const [inputProduct, setInputProduct] = useState("");
  const [inputMealType,setinputMealType] = useState("");
  const [mealSize,setSizeChange] = useState("");
  const [mealQuantity,setMealQuantity] = useState("");
  // const [saveVisibility, setSaveVisibility] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [mealPrice,setMealPrice] = useState(null);
  const [selectedCategoryID,setSelectedCategoryID] = useState("");
  const [selectedCuisine,setSelectedCuisine] = useState("");
  const [selectedCuisineID,setSelectedCuisineID] = useState("");
  const [inEditProcess,setInEditProcess] = useState(false);
  const [restaurantName,setRestaurantName] = useState("");
  const [restaurantNameID,setRestaurantNameID] = useState("");
  useEffect(() =>{return submitValues()})
  
  const pushIngredients = values => {
    const ingredients = listOfIngredients;
    ingredients.push(values);
    setlistOfIngredients([...ingredients]);
  };

  const changeInputProduct = e => {
    const value = e.target.value;
    setInputProduct(value);
  };

  const handleIngredientsDelete = ingredient => {
    
    const updatedList = listOfIngredients.filter(ingredientRaw => {
      if (JSON.stringify(ingredientRaw) === JSON.stringify(ingredient))
        return false;
      return true;
    });
    setlistOfIngredients(updatedList);
  };

  const handleIngredientsEdit = ingredient => {
    setSelectedIngredient(ingredient);
    setInEditProcess(true)
    const ingredients = listOfIngredients.filter(ingredientRaw => {
      if (JSON.stringify(ingredientRaw) === JSON.stringify(ingredient))
        return false;
      return true;
    });
    setlistOfIngredients(ingredients);
    setingredientVisible(true)
  };

  const deleteSelectedIngredients = () => {
    setSelectedIngredient({});
   
    
  };

  const closeIngredient = () => {
    setingredientVisible(false);
  };
  const resetselectedIngredientIntermediate = () =>{
    setselectedIngredientIntermediate({});
  }
  const getContainer = () => {
    if((Object.entries(selectedIngredientIntermediate).length === 0) && 
      (JSON.stringify(selectedIngredient) !== JSON.stringify(selectedIngredientIntermediate))) {
      setselectedIngredientIntermediate(selectedIngredient)
    }
    if (ingredientVisible)
      return (
        <Container
          onClose={closeIngredient}
          pushIngredients={pushIngredients}
          selectedIngredient={selectedIngredient}
          deleteSelectedIngredients={deleteSelectedIngredients}
          selectedIngredientIntermediate = {selectedIngredientIntermediate}
          resetselectedIngredientIntermediate ={resetselectedIngredientIntermediate}
          ingredients={props.ingredients}
          inEditProcess={inEditProcess}
          setInEditProcess={setInEditProcess}
        />
      );
    return;
  };
  if(listOfIngredients.length !== 0 && inputProduct !== "" 
  && inputMealType !=="" && restaurantName !== "" &&
  // mealSize && mealQuantity !==""
  //  && 
   mealPrice
  ){
    if(props.saveButtonDisabled){ 
      
      props.setSaveButtonDisabled(false)}
  }
  if(listOfIngredients.length === 0 || restaurantName === "" || inputProduct === "" 
  || inputMealType === "" 
  // || !mealSize || mealQuantity === "" 
  || !mealPrice
  ){
    if(!props.saveButtonDisabled){ 
     
      props.setSaveButtonDisabled(true)}
  }
  
  const submitValues = () => {

  if(props.isSave){
    // const mealType = {
    //   mealType: inputMealType,
    //   selectedCategoryID: selectedCategoryID
    // }
    const mealType = inputMealType
    // const mealCuisine = {
    //   selectedCuisine,
    //   selectedCuisineID
    // }
    const mealCuisine = selectedCuisine
    props.submitMeal(
      inputProduct,
      mealType,
      mealCuisine,
      mealSize,
      mealQuantity,
      mealPrice,
      listOfIngredients,
      props.isEdit,
      props.selectedRow._id,
      restaurantName,
      restaurantNameID
    );
    setlistOfIngredients([]);
    setInputProduct("");
    setMealPrice(null);
    setMealQuantity("");
    setSizeChange("");
    setinputMealType("");
    setSelectedCategoryID("");
    setSelectedCuisine("");
    setSelectedCuisineID("");
    setRestaurantName("");
    setRestaurantNameID("");
    props.changeSaveState(false)
    props.onClose();
  }  

  if(props.isCancel){
    setlistOfIngredients([]);
    setInputProduct("");
    setMealPrice(null);
    setMealQuantity("");
    setSizeChange("");
    setSelectedCuisine("");
    setSelectedCuisineID("");
    setinputMealType("");
    setSelectedCategoryID("");
    setRestaurantName("");
    setRestaurantNameID("");
    props.changeCancelState();
  }
}
if (props.isEdit && props.selectedRow.mealName !== inputProduct) {
  setInputProduct(props.selectedRow.mealName);
  setMealPrice(props.selectedRow.mealPrice);
  setMealQuantity(props.selectedRow.mealQuantity);
  setSizeChange(props.selectedRow.mealSize);
  setinputMealType(props.selectedRow.mealCategory ? props.selectedRow.mealCategory:"");
  setlistOfIngredients(props.selectedRow.ingredients ? props.selectedRow.ingredients:"");
  setSelectedCuisine(props.selectedRow.mealCuisine ? props.selectedRow.mealCuisine.selectedCuisine:"");
  // setSelectedCuisineID(props.selectedRow.mealCuisine ? props.selectedRow.mealCuisine.selectedCuisineID:"");
  // setSelectedCategoryID( props.selectedRow.mealCategory ? props.selectedRow.mealCategory.selectedCategoryID:"");
  setRestaurantName(props.selectedRow.restaurant.length > 0 ? props.selectedRow.restaurant[0].name:"");
  setRestaurantNameID(props.selectedRow.restaurant.length > 0 ? props.selectedRow.restaurant[0]._id:"")
}

const options = props.mealCategories.map(mealCategory => {
  return <Select.Option label={mealCategory._id} value={mealCategory.name} key={mealCategory.name}>{mealCategory.name}</Select.Option>
  })

const cuisineOption = props.cuisines.map(cuisine => {
  return <Select.Option key={cuisine._id} label={cuisine._id}>{cuisine.name}</Select.Option>
})  

  // console.log("props.selectedRow",props.selectedRow);
  return (
    <section>
      <Form layout="vertical">
      
        <FlexDisplay>
          <p>Enter Meal Name</p>
          <label className="Asterisk">*</label></FlexDisplay>
        <Input
          // placeholder="Enter Meal Name"
          value={inputProduct}
          onChange={changeInputProduct}
          className="add-meal-drawer-input"
        />
        <FlexDisplay>
          <p>Enter Restaurant Name</p>
          <label className="Asterisk">*</label></FlexDisplay>
        <Input
          // placeholder="Enter Meal Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="add-meal-drawer-input"
        />
        <FlexDisplay>
          <p>Enter Meal Category</p>
          <label className="Asterisk">*</label>
          </FlexDisplay>
        <Select
          // placeholder="Enter Meal Category"
          value={inputMealType === "" ? []:inputMealType}
          // style={{ width: 120 }}
          onChange={(value,option) => {
            setSelectedCategoryID(option.props.label)
          
          
            setinputMealType(value)}}
          className="add-meal-drawer-input select-category"
        >
            {options}
        </Select>
        <FlexDisplay>
          <p>Select Cuisine</p>
          {/* <label className="Asterisk">*</label> */}
          </FlexDisplay>
        <Select
          // placeholder="Enter Meal Category"
          value={selectedCuisine === "" ? []:selectedCuisine}
          // style={{ width: 120 }}
          onChange={(value,option) => {
            setSelectedCuisineID(option.props.label)
            setSelectedCuisine(option.props.children)}}
          className="add-meal-drawer-input select-category"
        >
            {cuisineOption}
        </Select>
        <FlexDisplay>
        <div>
        <FlexDisplay><p>Size</p>
          {/* <label className="Asterisk">*</label> */}
          </FlexDisplay>
          <Select className="meal-size" value={mealSize === "" ? []:mealSize} style={{ width: 120 }} onChange={(e) =>setSizeChange(e)}>
            <Select.Option value="small">small</Select.Option>
            <Select.Option value="medium">medium</Select.Option>
            <Select.Option value="large">large</Select.Option>
          </Select>
          </div>
        <QuantityWidth><QuantityMid>
      
         <FlexDisplay>
          <p>Quantity</p>
          {/* <label className="Asterisk">*</label> */}
          </FlexDisplay>
        <Input
          placeholder="Enter Quantity (i.e. 12 Ounces)"
          value={mealQuantity}
          onChange={(e) => setMealQuantity(e.target.value)}
          className="add-meal-drawer-input"
        />
        </QuantityMid>
        </QuantityWidth>
           

        </FlexDisplay>
        <FlexDisplay>
          <p>Price ($)</p>
          <label className="Asterisk">*</label>
          </FlexDisplay>
          
        <Input
          // placeholder="0"
          value={mealPrice}
          type="number"
          min="0"
          onChange={(e) => setMealPrice(e.target.value)}
          className="add-meal-drawer-input  meal-inputs-width"
        />
         
        <IngredientsAdd>
          <Ingredients>Ingredients <label className="Asterisk Ingredient-asterisk">*</label></Ingredients>
          <AddButton onClick={() => setingredientVisible(!ingredientVisible)}>
            + Add
          </AddButton>
        </IngredientsAdd>

        {getContainer()}

        <IngredientsList
          listOfIngredients={listOfIngredients}
          handleIngredientsEdit={handleIngredientsEdit}
          handleIngredientsDelete={handleIngredientsDelete}
          inEditProcess={inEditProcess}
        />
      </Form>
    </section>
  );
};

AddMeal.propTypes = {
  listOfIngredients: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  changeInputProduct: PropTypes.func,
  inputProduct: PropTypes.string,
  deleteSelectedIngredients: PropTypes.func,
  selectedIngredient: PropTypes.object,
  pushIngredients: PropTypes.func,
}

AddMeal.defaultProps = {
  placeholder:"",
  value:"",
  onChange:() => {},
  className:"",
}

const MapState = state => ({
  ingredients: state.ingredients,
  state: state,
  mealCategories: state.mealcategory.mealCategory,
  cuisines: state.cuisine.cuisines
})

const mapDispatchToProps = {
  submitMeal
}

export default connect(MapState,mapDispatchToProps)(Form.create()(AddMeal));
