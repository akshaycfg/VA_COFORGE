import React from "react";
import "./index.scss";
import TextAreaInput from "../Textarea";
import Button from "../Button";

const Summary = ({
  summary = "Expand to view the Target DDL",
  onChange,
  getFilterTabledata
}) => {
  return (
    <>
      <details className="detail-class">
        <summary className="summary-class">{summary}</summary>
        <p>
          <h4>Target DDL</h4>
          <TextAreaInput name={"nnn"} onChange={onChange} getFilterTabledata={getFilterTabledata} />
        </p>
        
      </details>
    </>
  );
};

export default Summary;
