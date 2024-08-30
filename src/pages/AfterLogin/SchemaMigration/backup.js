import React, { useEffect, useState } from "react";
import Summary from "../../../components/Summary";
import InputSelector from "../../../components/InputSelector";
import "./index.scss";
import styled from "styled-components";
import Button from "../../../components/Button";
import SchemaComparisonTable from "../../../components/SchemaComparisonTable";
import ErDiagram from "../../../components/ErDiagrams";
const ComparisonTable = styled.div`
  padding: 10px;
  display: flex;
  gap: ${(props) =>
    props.gap === 3
      ? "50px"
      : props.gap === 2
      ? "35px"
      : props.gap === 1
      ? "25px"
      : "15px"};
  max-width: 100%;
  flex-wrap: wrap;
`;

const SchemaMigration = ({
  data,
  getSchema,
  getTable,
  getSourceData,
  getTTDL,
}) => {
  console.log(getSourceData, "datadatadata");
  const schemaType = ["", "Schema1", "Schema2"];
  const [getSchematable, setSchemaTable] = useState("");
  const [showEr, setShowEr] = useState(false);
  const [getFilterTabledata, setFilterData] = useState(data);
  const [getModelData, setModelData] = useState([]);
  const [btnText, setText] = useState({
    zoomIn: "Min",
    zoomOut: "Max",
  });
  const [count, setCount] = useState(3);
  const [filterObj, setFilterObj] = useState({
    schema: "",
    table: "",
  });
  const handleSummaryInput = () => {};

  const HandlerChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "schema") {
      schemaOnchangeTable(value);
      document.getElementsByTagName("schema").value = value;
    }
    if (name === "table") {
      setFilterObj({ ...filterObj, table: name });
      //  filterTabledata(document.getElementsByTagName("schema").value, value);
    }
  };
  const schemaOnchangeTable = (schema, table) => {
    console.log(schema, getSourceData[schema], "getSourceData[schema]");
    setSchemaTable(schema);
    let arr = [];
    for (let i of Object.keys(getSourceData[schema])) {
      arr.push({ [i]: getSourceData[schema][i] });
    }
    setModelData(arr);
    console.log(arr, "tess");
  };

  // const filterTabledata = (schema, table) => {
  //   setFilterData(getSourceData[schema][table].columns);
  // };
  useEffect(() => {
    console.log(getSchema, "getSchemagetSchema");
    if (getTTDL.length !== 0) {
      schemaOnchangeTable(getSchema[0]);
      console.log(getTTDL, "getTTDL");
      setFilterData(getTTDL[getSchema[0]][getTable[getSchema[0]][0]]);
    }
  }, []);
  const Zoom = (event) => {
    if (event === "+") {
      if (count < 3) {
        setCount(count + 1);
      }
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };
  const viewEr = () => {
    setShowEr(true);
  };
  useEffect(() => {
    if (count === 3) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    } else if (count === 2) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    }
    if (count === 1) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    } else if (count === 0) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    }
  }, [count]);
  return (
    <>
      {getTable.length !== 0 ? (
        <div>
          <h3 className="er-digram">Schema Migration</h3>

          <div className="migration-dropdown">
            <InputSelector
              optionValue={getSchema}
              name="schema"
              selectLabel="schema"
              onChange={HandlerChange}
            />
            {getModelData.length !== 0 && (
              <div className="zoom-button-wraper">
                <Button
                  buttonText={btnText.zoomOut}
                  clickHandler={() => Zoom("+")}
                  height={"32px"}
                  margin={"10px"}
                  padding={"8px"}
                />
                <Button
                  buttonText={btnText.zoomIn}
                  clickHandler={() => Zoom("-")}
                  height={"32px"}
                  margin={"10px"}
                  padding={"8px"}
                />
                <Button
                  buttonText={"View ERDigram"}
                  clickHandler={() => viewEr()}
                  height={"32px"}
                  padding={"8px"}
                  width={"95px"}
                />
              </div>
            )}
          </div>
          {/* <ComparisonTable gap={count}>
            {getModelData.length !== 0 &&
              getModelData.map((item, index) => {
                return (
                  <SchemaComparisonTable
                    zoom={count}
                    name={Object.keys(item)}
                    data={item}
                    getTTDL={getTTDL}
                    schema={getSchematable}
                  />
                );
              })}
          </ComparisonTable> */}
          <Summary
            onChange={handleSummaryInput}
            getFilterTabledata={getFilterTabledata}
          />
          {showEr && (
            <div className="view-erdigram">
              {" "}
              <ErDiagram />{" "}
            </div>
          )}
        </div>
      ) : (
        <div className="error-message">Metadata has not been extracted</div>
      )}
      {/* <Summary
        onChange={handleSummaryInput}
        getFilterTabledata={getFilterTabledata}
      />
      :<div className="error-message">Metadata has not been extracted</div> */}
      {/* <Summary onChange={handleSummaryInput} /> */}
    </>
  );
};

export default SchemaMigration;
