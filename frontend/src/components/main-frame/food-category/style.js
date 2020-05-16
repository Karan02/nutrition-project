import styled from "@emotion/styled";

export const Wrapper = styled.div`

`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left:  60px;
  margin-right: 60px;
  margin-top: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
`

export const HeaderTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.23;
  letter-spacing: -0.72px;
  color: #011627;
`

export const HeaderButton = styled.button`
  border-radius: 4px;
  background-color: #2658ff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.21;
  text-align: center;
  color: #f7f8f9;
  padding-left: 16px;
  padding-right: 16px;
  transition: 0.4s ease-in-out;
  &:hover{
    background-color: #fff;
    color: #2658ff;
    border-color: #2658ff;
    border: 1px solid;
  }
`

export const Content = styled.div`
  display: block;
  justify-content: center;
  // max-width: 800px;
  margin: auto;
  padding-top: 25px;
  margin-right: 60px;
  margin-left: 60px;
`
export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20.5px;
  // width: 75%;
  @media (max-width: 769px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;



export const FooterResults = styled.p`
  font-size: 16px;
  line-height: 1.19;
  text-align: left;
  color: #a9acaf;

  @media (max-width: 650px) {
    padding-top: 12px;
  }
`;
export const HighlightResults = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  text-align: left;
  color: #181f28;
`;