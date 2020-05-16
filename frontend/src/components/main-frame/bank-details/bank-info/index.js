import React from "react";
import { Button, Header, Icon, Popconfirm } from "antd";
import PropTypes from "prop-types";

import {
  ContentWrapper,
  BankName,
  BankDetailsInfo,
  EditDelete,
  Edit,
  BankNameIn,
  AccountInfo,
  AccountNumber,
  IFSC,
  Paypal,
  Bold,
  Delete
} from "./style";

const BankInfo = (props) =>{
  return(
      <section>
        <ContentWrapper>
          <BankDetailsInfo>
            <BankName><Icon type="bank" /><BankNameIn>{props.bankAccountInfo.bankName}</BankNameIn></BankName>
            <AccountInfo>
              <AccountNumber>AccountNumber : <Bold>{props.bankAccountInfo.accountNumber}</Bold></AccountNumber>
  <IFSC>IFSC code : <Bold>{props.bankAccountInfo.ifscCode}</Bold></IFSC>
  <Paypal>PaypalID : <Bold>{props.bankAccountInfo.paypalId}</Bold></Paypal>
            </AccountInfo>
          </BankDetailsInfo>
          <EditDelete>
            <Edit onClick={() => props.handleEdit(props.bankAccountInfo)}><img src="../../../assets/edit-bank.svg"/></Edit>
            <Popconfirm
                title="Are you sure delete this account?"
                onConfirm={() => props.handleDelete(props.bankAccountInfo._id)}
                okText="Yes"
                cancelText="No"
            ><Delete><img src="./assets/delete-bank.svg"/></Delete></Popconfirm>
            
          </EditDelete>  
        </ContentWrapper>  
      </section>
  );

}
BankInfo.propTypes = {
  bankAccountInfo: PropTypes.object,
  onClick: PropTypes.func,
  okText: PropTypes.string,
  onConfirm: PropTypes.func,
  cancelText: PropTypes.string,
  title: PropTypes.string
};

BankInfo.defaultProps = {
  onClick : () => {},
  okText : "OK",
  onConfirm : () => {},
  cancelText : "Cancel",
  title : "",
};
export default BankInfo;