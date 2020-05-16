import styled from "@emotion/styled"

export const Header = styled.div`
display: flex;
font-size: 14px;
font-weight: 600;
line-height: 1.21;
text-align: center;
color: #f7f8f9;
padding-top: 40px;
padding-bottom: 30px;
border-bottom:solid 1px #e4e6f2;
justify-content: space-between;
`

export const HeaderTitle = styled.h2`
font-size: 30px;
font-weight: bold;
line-height: 1.23;
letter-spacing: -0.72px;
color: #011627;
`

export const AddIngredient = styled.button`
padding-right:16px;
padding-left:16px;
background-color:#2658ff;
border-radius: 4px;
max-height:36px;
transition:0.4s ease-in-out;
&:hover{

  color:#2658ff;
  border-color:#2658ff;
  background-color: #fff;
  border: 1px solid;
}
`

export const Wrapper = styled.div`
padding-left: 50px;
padding-right:60px;
`
export const ImportImage = styled.div`
  margin-top: 1px;
  padding-right: 10px;
`;
export const ImportText = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: auto;
`;
export const ImportFromXl = styled.p`
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.21;
  text-align: center;
  color: #899096;
`;

export const ExportImage = styled.div`
  padding-right: 10px;
  display: flex;
  margin: auto;
`;
export const ExportFromXl = styled.p`
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.21;
  text-align: center;
  color: #ffffff;
`;

export const ImportButton = styled.button`
  margin-right: 17px;
  display: flex !important;
  background-color: #f4f4f5;
  border: none !important;
  border-radius: 4px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  @media (max-width: 769px) {
    margin-right: 0px;
    padding: 10px 27px;
    margin-bottom: 5px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const ExportButton = styled.button`
  background-color: #f78b45;
  border: none;
  display: flex;
  margin-right: 17px;
  border-radius: 4px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
  @media (max-width: 769px) {
    margin-right: 0px;
    padding: 10px 27px;
    margin-bottom: 5px;
  }
`;

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