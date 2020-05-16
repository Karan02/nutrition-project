import React,{ useState } from "react";
import { Modal, Upload, Icon, message, Button } from "antd";
const { Dragger } = Upload;
import { connect } from "react-redux"
import { ChooseFileText, FlexDisplay } from "./style";
import PropTypes from 'prop-types';
import { fileblob,postFile } from "../../../../reducers/ingredients";
import { sample } from "../../../../reducers/ingredients";

const UpdateIngredientPopup = props => {
  const [disable,setDisable] = useState(true);
  const [selectedList,setSeletedList] = useState([]);
  const [fileSize,setFileSize] = useState(0);
  const propsUpload = {
    name: "file",
    multiple: false,
    onChange(info) {
      setSeletedList(info.fileList)
      setFileSize(info.file.size)
      if (info.fileList.length > 1)  info.fileList.splice(0,1)   
      const { status } = info.file;
      if (status === "error") {  
        if(info.file.size > 104857600){ 
          setDisable(true)
         return message.error("File is too large, Please upload smaller one",7)
        }
        setDisable(false)
        props.fileblob(info.file);
      }
    }
  };
  const handleSubmit = () => {
    props.postFile();
    props.handleCancel();
    
    
  }
  if(selectedList.length === 0 && disable === false) setDisable(true)
  if(selectedList.length !== 0 && disable === true && fileSize <20000) setDisable(false)
  
  const handleSampleDownload = () => {
    props.sample('ingredient');
  }
  
  return (
    <Modal
      title="Add / Update Ingredients"
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

      <Button disabled={disable} onClick={handleSubmit}>Submit</Button>
      </FlexDisplay>
        
      <FlexDisplay>
        <Button onClick={handleSampleDownload} className="download-button">Download a sample XL</Button>
      </FlexDisplay>
    </Modal>
  );
};

UpdateIngredientPopup.propTypes = {
  visible:PropTypes.bool,
  onCancel: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func
}

UpdateIngredientPopup.defaultProps = {
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
export default connect(null,MapDispatch)(UpdateIngredientPopup);
