import React,{ useState } from "react";
import { Modal, Upload, Icon, message, Button } from "antd";
const { Dragger } = Upload;
import { connect } from "react-redux"
import { ChooseFileText, FlexDisplay } from "./style";
import PropTypes from 'prop-types';
import { fileblob,postFile } from "../../../../reducers/meal";
import { sample } from "../../../../reducers/meal";

const UpdateMealPopup = props => {
  
  const [selectedList,setSeletedList] = useState([]);
  const [fileSize,setFileSize] = useState(0);
  const propsUpload = {
    name: "file",
    multiple: false,
    onChange(info) {
      // console.log("info",info)
      setSeletedList(info.fileList)
      setFileSize(info.file.size)
      if (info.fileList.length > 1)  info.fileList.splice(0,1)   
      const { status } = info.file;
      if (status === "error") {  
        if(info.file.size > 104857600){ 
          props.setDisableImport(true)
         return message.error("File is too large, Please upload smaller one",7)
        }
        props.setDisableImport(false)
        props.fileblob(info.file);
      }
    }
  };
  const handleSubmit = () => {
   
    props.postFile();
    props.handleOk();
    props.setDisableImport(true)
    setSeletedList([])
    setFileSize(0)
    
  }
  if(selectedList.length === 0 && props.disableImport === false) props.setDisableImport(true)
  if(selectedList.length !== 0 && props.disableImport === true && fileSize <20000) props.setDisableImport(false)
  
  const handleSampleDownload = () => {
    props.sample("meal");
  }
 
  return (
    <Modal
      title="Add / Update Meals"
      visible={props.visible}
      onCancel={props.handleCancel}
      destroyOnClose={true}
    >
      <Dragger {...propsUpload}>
        <p className="ant-upload-drag-icon">
          <img src="./assets/import.svg" />
        </p>
        {/* <p className="ant-upload-text">Click or drag file to this area to upload</p> */}
        <p className="ant-upload-hint">
          Drop a XL to update or add meal data or{" "}
          <ChooseFileText>Choose a file</ChooseFileText>
        </p>
      </Dragger>
      <FlexDisplay>

      <Button disabled={props.disableImport} onClick={handleSubmit}>Submit</Button>
      </FlexDisplay>
        
      <FlexDisplay>
        <Button onClick={handleSampleDownload} className="download-button">Download a sample XL</Button>
      </FlexDisplay>
    </Modal>
  );
};

UpdateMealPopup.propTypes = {
  visible:PropTypes.bool,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func
}

UpdateMealPopup.defaultProps = {
  className: "",
  title: "",
  visible: false,
  onCancel: () => {},
}

const MapDispatch = {
  fileblob,
  postFile,
  sample
}
export default connect(null,MapDispatch)(UpdateMealPopup);
