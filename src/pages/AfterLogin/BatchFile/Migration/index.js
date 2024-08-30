import "./index.scss";
import BatchOneTable from "../BatchOneTable";
import Button from "../../../../components/Button";
import BatchMigrationTable from "../BatchMigrationTable";
import InputSelector from "../../../../components/InputSelector";
import ProgressScaleBar from "../../../../components/ProgressScaleBar";
import Check from "../../../../images/Check.svg";
const Migration = ({}) => {
  const clickHandler = () => {};
  const configOptionValue = ["config 1", "config 2"];
  const tableOptionValue = ["table 1", "table 2"];
  return (
    <div className="batch-migration-container">
      <div className="migration-drop-down">
        <div className="migration-input-selector-container">
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
        <BatchMigrationTable />
      </div>

      <div className="migration-button-container">
        <div className="mig-progress-container">
          <ProgressScaleBar
            scale={100}
            status="SUCCESS"
            Text="hello"
            width="300px"
          />
          <div className="progress-success">
            <img src={Check} width="10" height="10" />
          </div>
        </div>

        <Button
          clickHandler={() => clickHandler()}
          buttonText="Start Migration"
          background="#ff7a45"
          color="white"
          width="100px"
          padding="6px"
          height="35px"
        />
      </div>
    </div>
  );
};

export default Migration;
