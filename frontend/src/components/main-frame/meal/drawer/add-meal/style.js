import styled from "@emotion/styled";

export const IngredientsAdd = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Ingredients = styled.p`
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: -0.38px;
  text-align: left;
  color: #011627;
  position:relative;
`;

export const FlexDisplay = styled.div`
display: flex;
flex-direction: row;
`
 
export const AddButton = styled.button`
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px #2658ff;
  padding: 7px 18px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.21;
  text-align: center;
  color: #2759ff;
  cursor: pointer;
  &:hover {
    border: solid 1px #003bff;
    color: #003bff;
  }
`;

export const QuantityMid = styled.div`

margin-left:10px;

`
export const QuantityWidth = styled.div`
width: 100%;

`