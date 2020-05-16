import styled from "@emotion/styled";
import { css, cx } from "emotion";



export const LoginContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: fit-content;
  overflow: hidden;
  @media screen and (min-width: 1300px) {
    height: 100vh;
  }
`;
export const LoginImage = styled.div`
  background-image: url(./assets/breakfast.png);
  background-repeat: no-repeat;
  background-position: -4px 84px;
  background-size: contain;
  position: relative;
  width: 895px;
  min-height: 755px;
`;
export const NutritionImage = styled.div`
  position: absolute;
  max-width: 1000px;
  top: 2px;
  width: 100%;
`;

export const InnerContainer = styled.div`
  border-radius: 16px;
  box-shadow: 7px 5px 34px 0 rgba(0, 0, 0, 0.09);
  border: 1px solid #e5e5e5;
  background-color: #f9f9f9;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  margin-top: 103px;
  position: relative;
  padding: 0px 77px 77px 77px;
  max-width: 622px;
  max-height: 572px;
`;

export const LoginA = styled.button`
  background-color: #2658ff;
  border-radius: 3px;
  margin-top: 44.5px;
  font-family: ProximaNova-Bold;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.71;
  letter-spacing: 0.21px;
  color: #ffffff;
  transition: 0.4s ease-in-out;
  width: 100%;
  min-height: 60px;
  &:hover {
    background-color: #013cfc;
  }
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  border:none;
  &:disabled{
    background-color: #92acff;
  }
`;

export const Logo = styled.p`
  text-align: center;
  margin: -62px auto 0px auto;
  border: solid 1px #e8dfdf;
  background-color: #ffffff;
  border-radius: 50%;

  min-width: 123px;
  min-height: 123px;
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-family: Tangerine;
  font-size: 46px;
  font-weight: bold;
  line-height: 1.57;
  color: #232323;
`;
export const AdminLogin = styled.p`
  margin-top: 37.5px;
  text-align: center;
  font-family: ProximaNova-Bold;
  font-size: 26px;
  font-weight: bold;
  line-height: 1.23;
  text-align: center;
  color: #232323;
`;
export const UserName = styled.div`
  margin-top: 28px;
`;


export const InputLabels = styled.p`
  margin-bottom: 17.5px;
  font-size: 19px;
  line-height: 1.21;
  text-align: left;
  color: #b0b0be;
`;

export const PasswordLabel = styled.p`
  margin-bottom: 17.5px;
  font-size: 19px;
  line-height: 1.21;
  text-align: left;
  color: #b0b0be;
  padding-top: 27.5px;
`;

export const PasswordTrigger = styled.span`
  font-size: 18px;
  line-height: 1.56;
  margin-left: -25px;
  color: #aba6be;
`;
export const Show = styled.span`
  position: absolute;
  font-size: 14px;
  letter-spacing: normal;
  text-align: left;
  color: #aba6be;
`;
export const Inputs = css`
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 3px;
  min-width: 240px;
  min-height: 60px;
  font-size: 18px;
  line-height: 1.22;
  text-align: left;
  color: #232323;
  min-height: 60px;
`;



export const ErrorLogin = css`
  color:red;
`

export const style = {
  checkBox: {
    marginLeft: "-60px",
    maxWidth: "12px !important",
    maxHeight: "12px !important"
  },
  errorLogin: {
    color: "red"
  }
  
};
export const PasswordMatch = styled.p`
color: red;
`