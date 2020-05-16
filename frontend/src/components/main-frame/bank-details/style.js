import styled from "@emotion/styled";

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 30px;
  margin-bottom: 34.5px;
  @media screen and (max-width: 426px) {
    flex-direction: column;
    padding-bottom: 12px;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const BankDetailsContainer = styled.div`
  padding: 33px 50px 0px 50px;
`;
export const BankDetailsTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.23;
  letter-spacing: -0.72px;
  color: #011627;
  margin: auto 0;
  @media screen and (max-width: 767px) {
    font-size: 23px;
  }
`;

export const AddBank = styled.button`
  position: relative;
  border-radius: 4px;
  background-color: #2658ff;
  padding: 10px 16px;
  transition: 0.4s ease-in-out;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.21;
  text-align: center;
  color: #f7f8f9;
  &:hover {
    color: #40a9ff !important;
    background-color: #fff !important;
    border-color: #40a9ff !important;
  }
 
`;
