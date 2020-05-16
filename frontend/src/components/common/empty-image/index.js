import React from "react";
import { Container,Image,Text } from "./style.js"
import PropTypes from "prop-types";

const EmptyImage = (props) => {

  return(
    <Container>
      <Image><img src="./assets/empty-box.jpg" /></Image>
      <Text>{props.text}</Text>
    </Container>
  )
}
EmptyImage.propTypes = {
  text: PropTypes.string
}

export default EmptyImage