import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBankDetails } from "../../../../reducers/bankdetails";
import { FlexDisplay } from "./style"
const BankForm = props => {
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [IFSCcode, setIFSCcode] = useState("");
  const [paypalID, setPaypalID] = useState("");
  // const [isSave,setIsSave] = useState(props.isSave);
  useEffect(() => {
   
   
    return onSaveButton();
  });
  const onAccountNumberChange = e => {
    setAccountNumber(e.target.value);
  };
  const onIFSCcodeChange = e => {
    setIFSCcode(e.target.value);
  };
  const onpaypalIDChange = e => {
    setPaypalID(e.target.value);
  };
  const onBankNameChange = e => {
    setBankName(e.target.value);
  };
  const { getFieldDecorator } = props.form;

  const clear_values = () => {
    if (
      accountNumber !== "" ||
      IFSCcode !== "" ||
      accountNumber !== "" ||
      paypalID !== ""
    ) {
      setBankName("");
      setIFSCcode("");
      setAccountNumber("");
      setPaypalID("");
    }
  };
  // console.log("bank form save",props.isSave)
  const onSaveButton = () => {
   
    if (props.isSave) {
      props.changeSaveState(false);
      props.addBankDetails(
        bankName,
        IFSCcode,
        accountNumber,
        paypalID,
        props.isEditBank,
        props.selectedbank._id
      );
      clear_values();
      props.onClose();
      return;
      // setIsSave(false)
    }
    if (props.isCancel) {
      
      clear_values();
      props.changeCancelState();
      props.onClose();
      // setIsSave(false)
  }
}
  //  else if (props.isCancel) {
  //   clear_values();
  //   props.changeCancelState();
  //   // setIsSave(false)
    
  // }
  
  function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  if (
    isEmptyOrSpaces(accountNumber) ||
    isEmptyOrSpaces(IFSCcode) ||
    isEmptyOrSpaces(bankName) ||
    isEmptyOrSpaces(paypalID) &&
    props.saveButtonDisabled !== true
  ) {
    props.setSaveButtonDisabled(true);
  } else if (
    !isEmptyOrSpaces(accountNumber) &&
    !isEmptyOrSpaces(IFSCcode) &&
    !isEmptyOrSpaces(bankName) &&
    !isEmptyOrSpaces(paypalID)){
    if (props.saveButtonDisabled) props.setSaveButtonDisabled(false);
  }

  // console.log('is save before return', props.isSave);

  if (
    Object.entries(props.selectedbank).length > 0
    && accountNumber !== props.selectedbank.accountNumber
    && !props.edited
  ) {
    setAccountNumber(props.selectedbank.accountNumber);
    setBankName(props.selectedbank.bankName);
    setIFSCcode(props.selectedbank.ifscCode);
    setPaypalID(props.selectedbank.paypalId);
    props.setIsEdited(true)
    // props.editIntermediateValue(false)
    // setIntermediateValue(false)
  }

  return (
    <Form layout="vertical" hideRequiredMark>
      <Form.Item label="">
        {/* {getFieldDecorator("name", { */}
        {/* rules: [{ required: true, message: "Please enter account number" }] */}
        {/* }) */}
        {/* ( */}
          <FlexDisplay>
            <p>Account Number</p><label className="Asterisk ">*</label></FlexDisplay>
        <Input
          value={accountNumber}
          onChange={onAccountNumberChange}
          placeholder="Account Number"
          className="fill-bank-details"
        />
        {/* )} */}
      </Form.Item>

      <Form.Item label="">
        {/* {getFieldDecorator("bank", { */}
        {/* rules: [{ required: true, message: "Please enter bank name" }] */}
        {/* })( */}
          <FlexDisplay>
          <p>Bank Name</p><label className="Asterisk ">*</label></FlexDisplay>
        <Input
          value={bankName}
          onChange={onBankNameChange}
          placeholder="Bank Name"
          className="fill-bank-details"
        />
        {/* )} */}
      </Form.Item>

      <Form.Item label="">
        {/* {getFieldDecorator("ifsc", { */}
        {/* rules: [{ required: true, message: "Please enter IFSC code" }] */}
        {/* })( */}
          <FlexDisplay>
          <p>IFSC code</p>
          <label className="Asterisk ">*</label></FlexDisplay>
        <Input
          value={IFSCcode}
          onChange={onIFSCcodeChange}
          placeholder="IFSC code"
          className="fill-bank-details"
        />
        {/* )} */}
      </Form.Item>

      <Form.Item label="">
        {/* {getFieldDecorator("paypal", { */}
        {/* rules: [{ required: true, message: "Please enter Paypal ID" }] */}
        {/*  })( */}
          <FlexDisplay>
          <p>PayPal ID</p>
          <label className="Asterisk ">*</label></FlexDisplay>
        <Input
        
          value={paypalID}
          onChange={onpaypalIDChange}
          placeholder="PayPal ID"
          className="fill-bank-details"
        />
        {/* )} */}
      </Form.Item>
    </Form>
  );
};

BankForm.propTypes = {
  form: PropTypes.object,
  accountNumber: PropTypes.string,
  bankName: PropTypes.string,
  IFSCcode: PropTypes.string,
  paypalID: PropTypes.string,
  onAccountNumberChange: PropTypes.func,
  onBankNameChange: PropTypes.func,
  onIFSCcodeChange: PropTypes.func,
  onpaypalIDChange: PropTypes.func,
  layout: PropTypes.string,
  hideRequiredMark: PropTypes.bool,
  label: PropTypes.string
};

BankForm.defaultProps = {
  value: "",
  onChange: () => {},
  placeholder: "",
  label: "",
  layout: "horizontal",
  hideRequiredMark: false
};

const mapDispatchToProps = {
  addBankDetails
};

export default connect(null, mapDispatchToProps)(Form.create()(BankForm));
