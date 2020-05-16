import styled from "@emotion/styled";

export const Section = styled.section`
  border-radius: 5px;
  padding: 20px;
  border: solid 1px #e4e6f2;
  margin-top: 17px;
`;

export const Labels = styled.label`
  padding-right: 0px;
  font-size: 14px;
  line-height: 1.21;
  color: #a3b0b2;
  padding-top: 3px;
`;
export const Inputs = styled.div`
  width: 330px;
`;
export const FlexDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`;
export const Dustbin = styled.button`
  position: absolute;
  right: -7px;
  top: -10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  @media (max-width: 766px) {
    display: none;
  }
`;
export const DisplayFlex = styled.div`
  display: flex;
  position: relative;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
`;

export const Save = styled.button`
  border-radius: 5px;
  background-color: #f78b45;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: 0.21px;
  color: #ffffff;
  padding: 11px 43px;
  border: none;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  &:hover {
    background-color: #f15f00;
  }
  &:disabled {
    background-color: #ffaa72;
  }
  @media (max-width: 766px) {
    
    padding: 8px 24px
  }
`;

export const Cancel = styled.button`
  border-radius: 5px;
  background-color: #cfcdcd;
  padding: 12px 33px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: 0.21px;
  color: #ffffff;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  &:hover {
    background-color: #888888;
  }
  @media (max-width: 766px) {
    
    padding: 7px 11px;
  }
`;

export const RelativePosition = styled.div`
position:relative
`