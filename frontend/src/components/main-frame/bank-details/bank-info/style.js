import styled from '@emotion/styled'

export const ContentWrapper = styled.div`
border: 1px solid #e4e6f2;
display: flex;
justify-content: space-between;
margin-bottom: 22px;
@media screen and (max-width: 426px) {
  
  flex-direction: column;
}

`
export const BankDetailsInfo = styled.div`
padding-top: 12px;
padding-left: 14.8px;
padding-right: 20px;
padding-bottom: 32.3px;
@media screen and (min width: 768px){
max-width: 80%;
}
`
export const BankName = styled.p`
position: relative;
`
export const BankNameIn = styled.span`
padding-left: 14px;
font-family: ProximaNova;
font-size: 16px;
font-weight: 600;
letter-spacing: -0.16px;
color: #232628;
`


export const AccountInfo = styled.div`
display: flex;
margin-left:28px;
margin-top: 17px;
// padding-right: 90px;
@media screen and (max-width: 769px) {
  
  padding-right: 0px;
  flex-direction: column;
}
`

export const AccountNumber = styled.p`
font-family: ProximaNova;
font-size: 14px;
padding-right: 90px;
letter-spacing: -0.14px;
color: #232628;
padding-right: 90px;
position: relative;
&:after {
content: "";
position: absolute;
width: 2px;
height: 20px;
background: #ddd;
top: 1px;
right: 45px;
}
@media screen and (max-width: 769px) {
  padding-right: 20px;
  padding-bottom: 10px;
  &:after {
    content: "";
    width: 0px;
  }
}
`

export const IFSC = styled.p`
font-family: ProximaNova;
font-size: 14px;
padding-right: 90px;
letter-spacing: -0.14px;
color: #232628;
padding-right: 90px;
position:relative;
&:after {
content: "";
position: absolute;
width: 2px;
height: 20px;
background: #ddd;
top: 1px;
right: 45px;
}
@media screen and (max-width: 769px) {
  padding-right: 20px;
  padding-bottom: 10px;
  &:after {
    content: "";
    width: 0px;
  }
}
`
export const Paypal = styled.p`

font-size: 14px;
font-style: normal;
letter-spacing: -0.14px;
text-align: left;
color: #232628;
`
// font-family: ProximaNova;



export const Bold = styled.span`
font-family:ProximaNova-Bold;
`

export const EditDelete = styled.div`
display:flex;
align-items: center;
padding-right: 20px;
// flex-direction: column;
@media screen and (max-width: 769px) {
  justify-content: center;
}
@media screen and (max-width: 426px) {
  flex-direction: row;
  padding-right:0px;
}
`

export const Edit = styled.button`

margin-right: 11px;
@media screen and (max-width: 769px) {
  margin-right: 0px;
}
background: transparent;
border: none;
`

export const Delete = styled.button`
background: transparent;
border: none;
`

