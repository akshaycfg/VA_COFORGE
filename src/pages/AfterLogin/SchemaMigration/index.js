import React, { useEffect, useState } from "react";
import Summary from "../../../components/Summary";
import InputSelector from "../../../components/InputSelector";
import "./index.scss";
import Storage from "../../../services/Storage";
import Button from "../../../components/Button";
import ErDiagram from "../../../components/ErDiagrams/index";
import arrowBack from "../../../images/arrow-back.svg";
const SchemaMigration = ({ data, getSchema, getTable, getTTDL }) => {
  console.log(data, "datadatadata");
  const schemaType = ["", "Schema1", "Schema2"];
  const [getSchematable, setSchemaTable] = useState([]);
  const [getFilterTabledata, setFilterData] = useState(data);
  const [showEr, setShowEr] = useState(false);
  const [getErdVal, setErdval] = useState("");

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
      // setFilterObj({ ...filterObj, schema: name })
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
    setFilterData(getTTDL[schema][table]);
  };
  useEffect(() => {
    console.log(getSchema, "getSchemagetSchema");
    if (getTTDL.length !== 0) {
      schemaOnchangeTable(getSchema[0]);
      console.log(getTTDL, "getTTDL");
      setFilterData(getTTDL[getSchema[0]][getTable[getSchema[0]][0]]);
    }
  }, []);
  const viewErd = () => {
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/gen_erd", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setErdval(data.content)
         console.log(data.content)
      })
      .catch((error) => console.log(error));
  };
  const viewEr = (value) => {
    setShowEr(value);
};

  setTimeout(() => {
    viewErd()
  }, 2000);

  return (
    <>
      {getTable.length !== 0 ? (
        <div>
          <div className="migration-dropdown">
          {
            !showEr && <InputSelector
            optionValue={getSchema}
            name="schema"
            selectLabel="schema"
            //  hideSelect={"hideSelect"}
            // labelText={"Schema"}
            onChange={HandlerChange}
          />
          }
           {
            !showEr &&  <InputSelector
            optionValue={getSchematable}
            name="table"
            selectLabel="table"
            //hideSelect={"hideSelect"}
            // labelText={"Table"}
            onChange={HandlerChange}
          />
          }
            {showEr ? (
              <img
                src={arrowBack}
                width="20"
                height="20"
                onClick={() => viewEr(false)}
                className="back-arrow"
              />
            ) : (
              <Button
                buttonText={"View ERDigram"}
                clickHandler={() => viewEr(true)}
                height={"35px"}
                padding={"8px"}
                margin={"10px"}
                width={"95px"}
              />
            )}
          </div>
          {showEr ? (
            <ErDiagram  getErdVal={getErdVal}/>
          ) : (
            <Summary
              onChange={handleSummaryInput}
              getFilterTabledata={getFilterTabledata}
            />
          )}
        </div>
      ) : (
        <div className="error-message">Metadata has not been extracted</div>
      )}
      {/* <Summary onChange={handleSummaryInput} /> */}
    </>
  );
};

export default SchemaMigration;
