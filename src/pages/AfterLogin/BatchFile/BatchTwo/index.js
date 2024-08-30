import "./index.scss";
import InputSelector from "../../../../components/InputSelector";
import BatchTwoTable from "../BatchTwoTable";

const BatchTwo = ({}) => {
  const configOptionValue = ["config 1", "config 2"];
  const tableOptionValue = ["table 1", "table 2"];
  return (
    <div className="batchone-container">
      <div className="batchtwo-input-selector-container">
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
      <div className="table-container">
        <BatchTwoTable />
      </div>
    </div>
  );
};

export default BatchTwo;
