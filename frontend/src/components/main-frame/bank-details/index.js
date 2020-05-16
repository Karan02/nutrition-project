import React, { useState,useEffect } from "react";
import { Spin, Button } from "antd";
import { connect } from "react-redux";
import {
  BankDetailsContainer,
  HeaderContent,
  BankDetailsTitle,
  AddBank
} from "./style.js";
import DrawerForm from "../../common/drawer";
import BankInfo from "./bank-info/index";
import { deleteBankDetails,getBankDetails } from "../../../reducers/bankdetails";
import  EmptyImage  from "../../common/empty-image/index"
import PropTypes from 'prop-types';


const BankDetails = props => {
  const [bankDetails, setBankDetails] = useState(false);
  const [isEditBank,setIsEditBank] = useState(false);
  const [selectedbank,setSelectedBank] = useState({});
  const [edited,setIsEdited] = useState(false);
  useEffect(()=>{
    props.getBankDetails()
  },[])
  
  const showDrawer = () => {
    setBankDetails(true);
  };
  const onCloseDrawer = () => {
    setSelectedBank({});
    setIsEditBank(false);
    setBankDetails(false);
    setIsEdited(false);
  };
  const handleEdit = (bankDetails) => {
    setSelectedBank(bankDetails);
    setIsEditBank(true);
    setBankDetails(true);
  }
  const handleDelete = (bankDetailsID) => {
    props.deleteBankDetails(bankDetailsID) 
  }

  const getBankInfo = () => {
    if(props.bankDetails.length > 0){
    const banks = props.bankDetails.map((bank, index) => {
    return (
      <BankInfo
        bankAccountInfo={bank}
        key={index}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    );
    });
    return banks;
  } else if(props.bankDetails.length === 0) {
   
    return (<EmptyImage text={"No bank details available. Please add your bank Details"} />) 
  }
}

const disable = props.bankDetails.length > 0 ? true: false

return ( 
    // <div className={bankDetailsContainer}>
    <div>
      <Spin tip="Loading Bank Details..." spinning={props.loading.getDetails}>
      <div>
        <DrawerForm
          // bankDetails={bankDetails}
          onClose={onCloseDrawer}
          visible={bankDetails}
          title={"ADD BANK DETAILS"}
          showDrawer={showDrawer}
          isEditBank={isEditBank}
          selectedbank={selectedbank}
          setIsEdited={setIsEdited}
          edited={edited}
          // accountNumber={accountNumber}
          // IFSCcode={IFSCcode}
          // paypalID={paypalID}
          // bankName={bankName}
          // onAccountNumberChange={onAccountNumberChange}
          // onIFSCcodeChange={onIFSCcodeChange}
          // onpaypalIDChange={onpaypalIDChange}
          // onBankNameChange={onBankNameChange}
        />
      </div>
      <BankDetailsContainer>
        <header>
          <HeaderContent>
            <BankDetailsTitle>Add Bank Details</BankDetailsTitle>
            
            <Button className="add-bank" disabled={disable} onClick={showDrawer}>+ Add Bank Details</Button>
          </HeaderContent>
        </header>

        {getBankInfo()}
      </BankDetailsContainer>
      </Spin>
    </div>
  );
};

const mapStateToProps = state => ({
  bankDetails:state.bank.bankDetails,
  loading: state.bank.loading
});

const mapDispatchToProps = {
  deleteBankDetails,
  getBankDetails
};

BankDetails.propTypes = {
  bankDetails: PropTypes.array,
  deleteBankDetails: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
