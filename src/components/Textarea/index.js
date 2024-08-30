import React from "react";
import styled from "styled-components";
import Label from "../Label";

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  height: auto;
  overflow-y: scroll;
  box-sizing: border-box;

  padding: 8px 12px 8px 12px;
  border: 1px solid #d9d9d9;
  outline: none;
  resize: none;
`;

const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const TextAreaInput = ({
  name,
  labelText,
  onChange,
  getFilterTabledata,
  defaultValue,
}) => {
  console.log(typeof getFilterTabledata, "getFilterTabledata");
  return (
    <TextAreaContainer>
      <label>{labelText}</label>
      <TextArea
        placeholder="Enter"
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
        value={typeof getFilterTabledata !== "object" ? getFilterTabledata : ""}
      />
    </TextAreaContainer>
  );
};

export default TextAreaInput;
