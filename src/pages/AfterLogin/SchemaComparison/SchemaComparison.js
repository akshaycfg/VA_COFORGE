import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
// import "./index.scss";
import Table from "../../../components/Table";
import "./SchemaComparison.scss";
import Union from "../../../images/Union.png";
import styled from "styled-components";
import SchemaTable from "../../../components/SchemaTable";
import InputSelector from "../../../components/InputSelector";
import Storage from "../../../services/Storage";
import ForeignKeyIcon from "../../../components/ForeignKeyIcon";
import PrimaryKeyIcon from "../../../components/PrimaryKeyIcon";
const SchemaComparison = ({ data, getSchema, getTable, getSourceData }) => {
  const TableContainer = styled.table``;
  const tableData = [
    {
      Schema: "demodb",
      Table: "image",
      Column: "body",
      SourceDatatype: "blob",
      TargetDatatype: "Bytea",
    },
    {
      Schema: "demodb",
      Table: "image",
      Column: "body",
      SourceDatatype: "blob",
      TargetDatatype: "Bytea",
    },
    {
      Schema: "demodb",
      Table: "image",
      Column: "body",
      SourceDatatype: "blob",
      TargetDatatype: "Bytea",
    },
    {
      Schema: "demodb",
      Table: "image",
      Column: "body",
      SourceDatatype: "blob",
      TargetDatatype: "Bytea",
    },
    {
      Schema: "demodb",
      Table: "image",
      Column: "body",
      SourceDatatype: "blob",
      TargetDatatype: "Bytea",
    },
  ];
  const schemaType = ["", "Schema1", "Schema2"];
  const tableType = ["", "table1", "table2"];
  const [getSchematable, setSchemaTable] = useState([]);
  const [getFilterTabledata, setFilterData] = useState(data);

  const [filterObj, setFilterObj] = useState({
    schema: "",
    table: "",
  });
  const naviGate = useNavigate();
  const addNewProject = () => {
    naviGate("/createproject");
  };
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "schema") {
      schemaOnchangeTable(value);
      document.getElementsByTagName("schema").value = value;
      setFilterObj({ ...filterObj, schema: name });
    }
    if (name === "table") {
      setFilterObj({ ...filterObj, table: name });
      filterTabledata(document.getElementsByTagName("schema").value, value);
    }
  };
  const schemaOnchangeTable = (schema, table) => {
    setSchemaTable(getTable[schema]);
  };

  const filterTabledata = (schema, table) => {
    console.log(schema, table);
    setFilterData(getSourceData[schema][table].columns);
  };

  useEffect(() => {
    console.log(getSchema, getSourceData, "getSchemagetSchema");
    if (getSchema.length !== 0 && getSourceData.length !== 0) {
     // schemaOnchangeTable(getSchema[0]);
      // setFilterData(getSourceData[getSchema[0]][getTable[getSchema[0]]].columns);
    }
  }, [getSchema]);
  return (
    <>
      {tableData.length !== 0 ? (
        <div className="project-container">
          {/* <Header/>
        <SideNav/> */}
        {console.log(getSchema,"rw",getSchematable)}
          <div className="schema-comparison-heading-part">
            <h3>Schema Comparison</h3>
            <div className="schema-dropdown">
              <InputSelector
                optionValue={getSchema!==undefined?getSchema:[]}
                name="Config"
                selectLabel="Config"
                // hideSelect={"hideSelect"}
                // labelText={"Schema"}
                onChange={HandlerChange}
              />
              <InputSelector
                optionValue={getSchematable!==undefined?getSchematable:[]}
                name="table"
                selectLabel="table"
                // hideSelect={"hideSelect"}
                //labelText={"Table"}
                onChange={HandlerChange}
              />
            </div>
          </div>
          <div style={{ float: "right" }}>
            {" "}
            <ForeignKeyIcon /> : Foreign Key <PrimaryKeyIcon /> : Primary Key
          </div>
          <div className="table-container">
            <SchemaTable data={tableData} />
          </div>
        </div>
      ) : (
        <div className="error-message">Mapping has not been applied</div>
      )}
    </>
  );
};

export default SchemaComparison;
