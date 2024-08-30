import React from "react";
import styled from "styled-components";
import "./index.scss";

const ButtonContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};
  margin-top: ${(props) => (props.margin ? props.margin : "0px")};
  background-color: ${(props) =>
    props.background ? props.background : "white"};
  padding: ${(props) => (props.padding ? props.padding : "6px")};
  font-size:12px;
`;
const ButtonDiv = styled.div`
  color: ${(props) => (props.color ? props.color : "black")};
`;
const Button = ({
  clickHandler,
  buttonText,
  width,
  height,
  background,
  padding,
  color,
  image,
  margin,
  type,
}) => {
  return (
    <>
      <ButtonContainer
        className="button-container"
        width={width}
        height={height}
        background={background}
        padding={padding}
        color={color}
        margin={margin}
      >
        {image ? <img src={image} alt="" width="15" height="15" /> : ""}

        <ButtonDiv onClick={clickHandler} color={color} className="button-text">
          {buttonText}
        </ButtonDiv>
      </ButtonContainer>
    </>
  );
};

export default Button;
