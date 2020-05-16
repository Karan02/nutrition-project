import React from "react";
import {
  Wrapper,
  Container,
  Edit,
  Delete,
  IngredientsTitle,
  Quantity,
  Span
} from "./style";
import PropTypes from 'prop-types';

const IngredientsList = props => {
  
  const listOfIngredients = props.listOfIngredients;
  
  
  return (
    <Wrapper>
         
  { listOfIngredients.map( (ingredient,index) =>{
    
    return <Container key={index}>
            <div>
              <IngredientsTitle>{ingredient.ingredientsName}</IngredientsTitle>
              <Quantity>
                <Span>{ingredient.quantity}</Span>{ingredient.container}
              </Quantity>
            </div>
            <div>
              <Edit disabled={props.inEditProcess} onClick = {() => props.handleIngredientsEdit(ingredient)}>
                <img src="./assets/editmealdrawer.svg" />
              </Edit>
              <Delete onClick = {() => props.handleIngredientsDelete(ingredient)}>
                <img src="./assets/delete-bank.svg" />
              </Delete>
            </div>
        </Container>})
    }
    </Wrapper>
  );
};

IngredientsList.propTypes = {
  listOfIngredients: PropTypes.array,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  key: PropTypes.number,
}

IngredientsList.defaultProps = {
  onClick: () => {},
}

export default IngredientsList;
