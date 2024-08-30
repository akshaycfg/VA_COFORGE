import "./index.scss";
import InputSelector from "../../../../components/InputSelector";
import BatchOneTable from "../BatchOneTable";
import Button from "../../../../components/Button";
import Popup from "../../../../components/Popup";
const BatchOne = ({}) => {
  const configOptionValue = ["config 1", "config 2"];
  const tableOptionValue = ["table 1", "table 2"];
  return (
    <div className="batchone-container">
      <div className="batchone-buttoncontainer">
        <div className="batchone-input-selector-container">
          <InputSelector
            optionValue={configOptionValue}
            name="config"
            selectLabel="Config"
          />
          <InputSelector
            optionValue={tableOptionValue}
            name="table"
            selectLabel="Table"
          />
        </div>
        <Popup />
      </div>
      <div className="table-container">
        <BatchOneTable />
      </div>
    </div>
  );
};

export default BatchOne;
