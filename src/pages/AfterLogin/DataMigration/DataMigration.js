import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
// import "./index.scss";
import Table from "../../../components/Table";
import "./DataMigration.scss";
import Union from "../../../images/Union.png";
import styled from "styled-components";
import SchemaTable from "../../../components/SchemaTable";
import InputSelector from "../../../components/InputSelector";
import Storage from "../../../services/Storage";
import MigrationTable from "../../../components/MigrationTable";
import Progress from "react-progressbar";
import ProgressScaleBar from "../../../components/ProgressScaleBar";
import Loader from "../../../components/Loader";
import ArrowLoader from "../../../components/ArrowLoader";
import { ToastContainer, toast } from "react-toastify";
import { Alert, Snackbar } from "@mui/material";
const ProgressBarContainer = styled.div`
  display: flex;
  gap: 0px;
  width: 60%;
`;

const DataMigration = ({ data, getSchema, getTable, getSourceData }) => {
  const [getMigrationData, setMigrationData] = useState([]);
  const [getTableData, setTableData] = useState([]);
  const [getMigrationDataList, setMigrationDataList] = useState([]);
  const [getTablevalue, setTablevalue] = useState("");
  const [getStartMigrationStatus, startMigrationStatus] = useState();
  const [getStatusCode, setStatusCode] = useState(false);
  const [getDeploy, setDeploy] = useState("");
  const [getMigrationStatus, setMigrationStatus] = useState({
    total: 0,
    migrated: 0,
  });
  const [loader, setLoder] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] =useState({status:"",message:""});
  const showToastMessage = (status, message) => {
  setOpen(true)
  setMessage({status:status,message:message})
};
  const TableContainer = styled.table``;
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    setFilterDatatable(value);
    setTablevalue(value);
  };

  const convertArrayobject = (data, dataList, val, interval) => {
    const arryaObject = [];
    for (let item of data) {
      for (let x of Object.keys(dataList[item])) {
        arryaObject.push({
          table: x,
          Migration: dataList[item][x],
          schema: item,
        });
      }
    }
    const filterValue = [...new Set(arryaObject)];
    const response = filterValue.filter(
      (x) => x.Migration === "RUNNING" || x.Migration === "PENDING"
    );
    setTableData(filterValue.filter((x) => x.schema === val));
    startMigrationStatus(true);
    if (response.length !== 0) {
      loaderA();
      setStatusCode(response.length);
    } else {
      clearInterval(interval);
    }
  };
  const convertArrayobjectIni = (data, dataList) => {
    const arryaObjectini = [];
    for (let item of data) {
      for (let x of Object.keys(dataList[item])) {
        arryaObjectini.push({
          table: x,
          Migration: dataList[item][x],
          schema: item,
        });
      }
    }
    setMigrationDataList(arryaObjectini);
  };

  const initialMigrationStatus = () => {
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/initial_migration_status", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMigrationData(Object.keys(data));
        convertArrayobjectIni(Object.keys(data), data);
      })
      .catch((error) => setDeploy("Schema has not been deployed"));
  };
  useEffect(() => {
    initialMigrationStatus();
  }, [getTablevalue]);

  const loaderA = () => {
    setLoder(true);
    setTimeout(() => {
      setLoder(false);
    }, 20000);
  };

  const setFilterDatatable = (value) => {
    let filterTable = getMigrationDataList.filter((x) => x.schema === value);
    setTableData(filterTable);
  };
  const abortController = new AbortController();
  const everySecondtimerApi = (val, interval) => {
    const signal = abortController.current;
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
      schema: val,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };

    fetch("/migration_status", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        convertArrayobject(Object.keys(data), data, val, interval);
      });
  };
  let interval;
  let dataResponse;
  let count = 0;
  useEffect(() => {
    dataResponse = getTableData.filter(
      (x) => x.Migration === "RUNNING" || x.Migration === "PENDING"
    );
    interval = setInterval(function () {
      if (getTablevalue !== "" && dataResponse.length !== 0) {
        count++;
        const ever = async () => {
          await everySecondtimerApi(getTablevalue, interval);
        };
        ever();
      } else {
        count++;
        if (getTablevalue !== "") {
          everySecondtimerApi(getTablevalue, interval);
        }
        if (dataResponse.length === 0) {
          clearInterval(interval);
          count++;
        }
      }
    }, 20000);
    return () => {
      clearInterval(interval);
    };
  }, [
    interval,
    getTablevalue,
    getStartMigrationStatus,
    dataResponse,
    count,
    getStatusCode,
  ]);

  const startMigration = () => {
    setLoder(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
      schema: getTablevalue,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/migrate_data", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        everySecondtimerApi(getTablevalue);
        showToastMessage("success", data.Status);
        setLoder(false);
      });
  };

  const overAllProgress = (status) => {
    let countAll = getTableData.length;
    let count = getTableData.filter((x) => x.Migration === status).length;
    return (100 * count) / countAll;
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {true  ? (
        <div>
           <Snackbar open={open } autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical:"top", horizontal:"rigth"}}>
        <Alert
          onClose={handleClose}
          severity={message.status}
          variant="filled"
          sx={{ width: '30%' }}
          key={'top' + 'right'}
        >
        {message.message}
        </Alert>
      </Snackbar>
          <ToastContainer />
          <div className="project-container">
            {loader && <Loader />}
            <div className="schema-comparison-heading-part">
              <h3>Data Migration</h3>
              <div className="filter-div">
                <div className="schema-dropdown">
                  <InputSelector
                    optionValue={getMigrationData}
                    name="schema"
                    selectLabel="schema"
                    onChange={HandlerChange}
                  />
                </div>
                <div className="progress-container">
                  {" "}
                  <ProgressBarContainer>
                    {getTableData.length !== 0 &&
                      getTableData.filter((x) => x.Migration === "SUCCESS")
                        .length !== 0 && (
                        <ProgressScaleBar
                          scale={overAllProgress("SUCCESS")}
                          width="100px"
                          status="SUCCESS"
                          Text=""
                        />
                      )}
                    {getTableData.length !== 0 &&
                      getTableData.filter((x) => x.Migration === "RUNNING")
                        .length !== 0 && (
                        <ProgressScaleBar
                          scale={overAllProgress("RUNNING")}
                          width="100px"
                          status="RUNNING"
                          Text=""
                        />
                      )}
                    {getTableData.length !== 0 &&
                      getTableData.filter((x) => x.Migration === "FAILED")
                        .length !== 0 && (
                        <ProgressScaleBar
                          scale={overAllProgress("FAILED")}
                          width="100px"
                          status="FAILED"
                          Text=""
                        />
                      )}
                  </ProgressBarContainer>
                  <div className="migratin-status">
                    {getTableData.filter((x) => x.Migration === "SUCCESS")
                      .length +
                      "/" +
                      getTableData.length}{" "}
                    Tables Migrated
                  </div>
                </div>
              </div>
            </div>
            <div className="table-container">
              <MigrationTable data={getTableData} ArrowLoader={ArrowLoader} />
            </div>
          </div>
          <div className="migration-button">
            <Button
              background={"#f26a51"}
              color="white"
              buttonText="Start Migration"
              clickHandler={() => startMigration()}
            />
          </div>
        </div>
      ) : (
        <div className="error-message">{getDeploy}</div>
      )}
    </>
  );
};

export default DataMigration;
