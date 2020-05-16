import styled from "@emotion/styled";

export const Buttons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  bordertop: 1px solid #e9e9e9;
  padding: 20px 26px;
  background: #efefef;
  text-align: right;
`;
export const Cancel = styled.button`
  height: 45px;
  margin-right: 8px;
  padding: 14px 57px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57px;
  letter-spacing: 0.21px;
  text-align: left;
  color: #ffffff;
  background-color: #ff7f50;
  border-radius: 3px;
  border: 1px solid #ff7f50;
  transition: 0.4s ease-in-out;
  &:hover {
    background-color: #cd5b45;
  }
  cursor: pointer;
  @media screen and (max-width: 767px) {
  padding: 14px 24px;
  }
`;
export const Save = styled.button`
  height: 45px;
  margin-right: 8px;
  padding: 14px 57px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.57px;
  letter-spacing: 0.21px;
  text-align: left;
  color: #ffffff;
  background-color: #2658ff;
  border: 1px solid #2658ff;
  border-radius: 3px;
  transition: 0.4s ease-in-out;
  &:hover {
    background-color: #00208a;
  }
  &:disabled{
    background-color: #7495ff;
  }
  cursor: pointer;
  @media screen and (max-width: 767px) {
    padding: 14px 24px;
    }
`;
