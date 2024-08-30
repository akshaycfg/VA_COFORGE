import React from "react";
import styled from "styled-components";

const DefaultLabel = styled.label`
  font-size: 14px;
`;

const Label = ({ labelText = "text" }) => {
  return (
    <>
      <DefaultLabel>{labelText}</DefaultLabel>
    </>
  );
};

export default Label;
