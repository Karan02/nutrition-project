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
  padding-left: 16px;
  padding-right: 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.21;
  text-align: center;
  color: #f7f8f9;
  transition: 0.4s ease-in-out;
  &:hover{
    background-color: #fff;
    color: #2658ff;
    border-color: #2658ff;
    border: 1px solid;
  }

`

export const Content = styled.div`
// width: 80%;
margin: auto;
margin-left: 60px;
margin-right: 60px;
margin-top: 30px;
`