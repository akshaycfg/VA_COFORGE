import React, { useEffect } from "react";
import "./index.scss";
import styled from "styled-components";
import { useState } from "react";
import Button from "./../../../components/Button";
import Check from "../../../images/Check.svg";
import ProjectForm from "./../../Project/ProjectForm";
import BreadCrumbs from "./../../../components/BreadCrumbs";
import Sources from "./../Sources";
import Target from "./../Target/Target";
import Storage from "../../../services/Storage";
import TargetAdlsForm from "../Forms/TargetForms/TargetAdlsForm";
import TargetAzureForm from "../Forms/TargetForms/TargetAzureForm";
import TargetOracleForm from "../Forms/TargetForms/TargetOracleForm";
import TargetPostgresForm from "../Forms/TargetForms/TargetPostgresForm";
import SourceAzureForm from "../Forms/SourceForms/SourceAzureForm";
import SourceOracleForm from "../Forms/SourceForms/SourceOracleForm";
import SourcePostgresForm from "../Forms/SourceForms/SourcePostgresForm";
import SourceAdlsForm from "../Forms/SourceForms/SourceAdlsForm";
import { useNavigate } from "react-router";
import Loader from "./../../../components/Loader";
import { ShowMessage } from "../../../components/ShowMessage";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  listMetaDataAsync,
  saveConfigAsync,
  testConnectioResetAsync,
  testConnectionAsync,
} from "../../../lib/stepper";
import { Alert, Snackbar } from "@mui/material";
import AwsS3Form from "../Forms/SourceForms/awsForm";
import TargetAwsS3Form from "../Forms/TargetForms/AwsS3Form";
const MainStaper = styled.div`
  width: 260px;
  border-right: 1px solid #c3c3c354;
  padding: 15px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: white;
`;
const ProjectCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.projectProgressCircle ? "3px solid #ff7a4 " : ""};
  border-radius: 100%;
  background-color: ${(props) =>
    props.projectProgress
      ? "#001529"
      : props.projectProgressCircle && "#ff7a45"};
  color: ${(props) => (props.projectProgress ? "white" : "#001529")};
`;
const ProjectName = styled.span`
  font-weight: 600;
`;
const SourceCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.sourceProgress ? "#001529" : props.sourceProgressCircle && "#ff7a45"};
  color: ${(props) =>
    props.sourceProgress
      ? "white"
      : props.sourceProgressCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.sourceProgressCircle ? "3px solid #ff7a45" : "3px solid #c3c3c3"};
  border-radius: 100%;
`;
const SourceName = styled.span`
  font-weight: ${(props) =>
    props.sourceProgress ? "600" : props.sourceProgressCircle ? "600" : ""};
`;
const TargetCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.targetProgress ? "#001529" : "white")};
  color: ${(props) =>
    props.targetProgress
      ? "white"
      : props.targetProgressCircle
      ? "#001529"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.targetProgressCircle ? "3px solid #001529" : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.targetProgress
        ? "black"
        : props.targetProgressCircle
        ? "black"
        : ""};
  }
`;
const TargetName = styled.span`
  font-weight: ${(props) =>
    props.targetProgress ? "600" : props.targetProgressCircle ? "600" : ""};
`;
const VerticalLineOne = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${(props) =>
    props.verticleLineOne ? "#ff7a45" : "#c3c3c385"};
  margin-left: 16px;
`;
const VerticalLineTwo = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${(props) =>
    props.verticleLineTwo ? "#ff7a45" : "#c3c3c385"};
  margin-left: 16px;
`;
const Stepper = () => {
  const [stepperLoader, setStepperLoader] = useState();
  const [projectProgress, setProjectProgress] = useState(true);
  const [sourceProgress, setSourceProgress] = useState(false);
  const [targetProgress, setTargetProgress] = useState(false);
  const [verticleLineOne, setVerticleLineOne] = useState(false);
  const [verticleLineTwo, setVerticleLineTwo] = useState(false);
  const [projectProgressContent, setProjectContent] = useState(false);
  const [sourceProgressContent, setSourceProgressContent] = useState(false);
  const [targetProgressContent, setTargetProgressContent] = useState(false);
  const [projectProgressCircle, setProjectCircle] = useState(false);
  const [sourceProgressCircle, setSourceCircle] = useState(false);
  const [targetProgressCircle, setTargetCircle] = useState(false);
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState({
    text: "Next",
    bgColor: "#001529",
  });
  const [count, setCount] = useState(1);
  const [getDatabaseType, setDatabaseType] = useState({ databaseType: "" });
  const storeResponse = useSelector((state) => state.steppertReducer);
  const naviGate = useNavigate();
  let formData = {
    project_name: Storage.getItem("project_name"),
    description: Storage.getItem("description"),
    source_database: Storage.getItem("source_database"),
    target_database: Storage.getItem("target_database"),

    target_username:
      Storage.getItem("target_database") === "Oracle DB"
        ? Storage.getItem("username_target_oracle")
        : Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("username_target_postgres")
        : Storage.getItem("target_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("username_target_azure")
        : "",
    host: Storage.getItem("host"),
    port: Storage.getItem("port"),

    target_password:
      Storage.getItem("target_database") === "Oracle DB"
        ? Storage.getItem("password_target_oracle")
        : Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("password_target_postgres")
        : Storage.getItem("target_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("password_target_azure")
        : "",
    database_type: Storage.getItem("database_type"),

    username:
      Storage.getItem("source_database") === "Oracle DB"
        ? Storage.getItem("username_source_oracle")
        : Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("username_source_postgres")
        : Storage.getItem("source_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("username_source_azure")
        : "",

    host_source:
      Storage.getItem("source_database") === "Oracle DB"
        ? Storage.getItem("host_source_oracle")
        : Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("host_source_postgres")
        : Storage.getItem("source_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("host_source_azure")
        : "",

    port_source:
      Storage.getItem("source_database") === "Oracle DB"
        ? Storage.getItem("port_source_oracle")
        : Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("port_source_postgres")
        : Storage.getItem("source_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("port_source_azure")
        : "",

    dsn_source:
      Storage.getItem("source_database") === "Oracle DB"
        ? Storage.getItem("dsn_source_oracle")
        : Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("dsn_source_postgres")
        : Storage.getItem("source_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("dsn_source_azure")
        : "",

    host_target:
      Storage.getItem("target_database") === "Oracle DB"
        ? Storage.getItem("host_target_oracle")
        : Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("host_target_postgres")
        : Storage.getItem("target_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("host_target_azure")
        : "",

    database_type_source:
      Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("database_type_source_postgres")
        : null,
    database_type_target:
      Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("database_type_target_postgres")
        : null,

    port_target:
      Storage.getItem("target_database") === "Oracle DB"
        ? Storage.getItem("port_target_oracle")
        : Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("port_target_postgres")
        : Storage.getItem("target_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("port_target_azure")
        : "",

    dsn_target:
      Storage.getItem("target_database") === "Oracle DB"
        ? Storage.getItem("dsn_target_oracle")
        : Storage.getItem("target_database") === "PostgreSQL"
        ? Storage.getItem("dsn_target_postgres")
        : Storage.getItem("target_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("dsn_target_azure")
        : "",

    password:
      Storage.getItem("source_database") === "Oracle DB"
        ? Storage.getItem("password_source_oracle")
        : Storage.getItem("source_database") === "PostgreSQL"
        ? Storage.getItem("password_source_postgres")
        : Storage.getItem("source_database") === "ADLS Gen 2"
        ? null
        : Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("password_source_azure")
        : "",
    storage_account_name:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("storage_account_name_source_adls")
        : null,
    container_name:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("container_name_source_adls")
        : null,
    storage_access_key:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("container_name_source_adls")
        : null,
    storage_account_name_target:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("storage_account_name_target_adls")
        : null,
    container_name_target:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("container_name_target_adls")
        : null,
    storage_access_key_target:
      Storage.getItem("source_database") === "ADLS Gen 2"
        ? Storage.getItem("container_name_target_adls")
        : null,

    server_target:
      Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("server_target_azure")
        : null,
    database_target:
      Storage.getItem("target_database") === "Azure Synapse Analytics"
        ? Storage.getItem("database_target_azure")
        : null,
    server_source:
      Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("server_source_azure")
        : null,
    database_source:
      Storage.getItem("source_database") === "Azure Synapse Analytics"
        ? Storage.getItem("database_source_azure")
        : null,
  };
  const nextClick = () => {
    console.log("clivked");
    if (count === 1) {
      setCount(count + 1);
      setProjectProgress(false);
      setProjectCircle(true);
      setProjectContent(true);
      setSourceProgress(true);
      setVerticleLineOne(true);
    } else if (count === 2) {
      setCount(count + 1);
      setTargetProgress(true);
      setVerticleLineTwo(true);
      setSourceCircle(true);
      setSourceProgressContent(true);
      setSourceProgress(false);
      setProjectContent(true);
      setButtonText({ text: "Save Project", bgColor: "#ff7a45" });
    } else if (buttonText.text === "Save Project") {
      saveDataforProject();
    }
  };
  const previousClick = () => {
    if (count === 2) {
      setCount(count - 1);
      setSourceProgress(false);
      setSourceCircle(false);
      setSourceProgressContent(false);
      setVerticleLineOne(false);
      setProjectProgress(true);
      setProjectContent(false);
    } else if (count === 3) {
      setCount(count - 1);
      setTargetProgress(false);
      setTargetCircle(false);
      setTargetProgressContent(false);
      setSourceProgressContent(false);
      setSourceCircle(false);
      setSourceProgress(true);
      setVerticleLineTwo(false);
      setButtonText({ text: "Next", bgColor: "#001529" });
    }
  };
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", message: "" });
  const showToastMessage = (status, message) => {
    setOpen(true);
    setMessage({ status: status, message: message });
  };

  const breadData = [
    { path: "projects", text: "Project " },
    { path: "createproject", text: "Create Project" },
  ];

  const saveDataforSource = () => {
    setStepperLoader(true);
    let postData = {
      project_name: formData.project_name,
      database_type: formData.source_database,
    };
    if (formData.database_type_source !== null) {
      postData.dbname = formData.database_type_source;
    }
    if (formData.host_source !== null) {
      postData.host = formData.host_source;
    }
    if (formData.port_source !== null) {
      postData.port = formData.port_source;
    }
    if (formData.server_source !== null) {
      postData.server = formData.server_source;
    }
    if (formData.database_source !== null) {
      postData.database = formData.database_source;
    }
    if (formData.dsn_source !== null) {
      postData.dsn = formData.dsn_source;
    }
    if (formData.username !== null) {
      postData.username = formData.username;
    }
    if (formData.password !== null) {
      postData.password = formData.password;
    }
    if (formData.container_name !== null) {
      postData.container_name = formData.container_name;
    }
    if (formData.storage_account_name !== null) {
      postData.storage_account_name = formData.storage_account_name;
    }
    if (formData.storage_access_key !== null) {
      postData.storage_access_key = formData.storage_access_key;
    }
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/save_config", requestOptions)
      .then((response) => response.json())
      .then((data) => saveDataforTarget());
  };

  const saveDataforTarget = () => {
    setStepperLoader(true);
    let postData = {
      project_name: formData.project_name,
      database_type: formData.target_database,
    };
    if (formData.dsn_target !== null) {
      postData.dsn = formData.dsn_target;
    }
    if (formData.server_target !== null) {
      postData.server = formData.server_target;
    }
    if (formData.database_target !== null) {
      postData.database = formData.database_target;
    }
    if (formData.database_type_target !== null) {
      postData.dbname = formData.database_type_target;
    }
    if (formData.target_username !== null) {
      postData.username = formData.target_username;
    }

    if (formData.target_password !== null) {
      postData.password = formData.target_password;
    }
    if (formData.host_target !== null) {
      postData.host = formData.host_target;
    }
    if (formData.port_target !== null) {
      postData.port = formData.port_target;
    }
    if (formData.container_name_target !== null) {
      postData.container_name = formData.container_name_target;
    }
    if (formData.storage_account_name_target !== null) {
      postData.storage_account_name = formData.storage_account_name_target;
    }
    if (formData.storage_access_key_target !== null) {
      postData.storage_access_key = formData.storage_access_key;
    }
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/save_config", requestOptions)
      .then((response) => response.json())
      .then((data) => saveSchemaAPI());
  };

  const saveSchemaAPI = () => {
    setStepperLoader(true);
    let postData = {
      project_name: formData.project_name,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/list_schemas", requestOptions)
      .then((response) => response.json())
      .then((response) => naviGate("/projects"));
  };
  const saveDataforProject = () => {
    setStepperLoader(true);
    let dataConfig =  JSON.parse(Storage.getItem("configfile"));
    const dataAc= [];
    for(let x in dataConfig){
      dataAc.push(dataConfig[x].name)
    }

    let postData = {
      project_name: formData.project_name,
      description: formData.description,
      source: formData.source_database,
      target: "AWS S3",//formData.target_database,
      created_by: JSON.parse(Storage.getItem("user")).username,
      source_database_type :  formData.source_database,
      metadata_source : Storage.getItem("metadata_source"),//"business_files",
      list_of_configs :   dataAc,
      username : formData.username,//"postgres",
      password :formData.password,// "welcome@2304",
      host : formData.host_source,//"20.124.123.153",
      port : formData.port_source,//"5432",
      dbname : formData.database_type_source

    };
console.log(postData);

// {
//   "created_by": "admin",
//   "description": "Postgres to AWS S3",
//   "project_name": "PG_to_S3_metadata_businessfile",
//   "source_database_type":"PostgreSQL",
//   "source": "PostgreSQL",
//   "target": "AWS S3",
//   "metadata_source":"business_files",
//   "list_of_configs":["cirium_otp.py"],
//   "username":"postgres",
//   "password":"welcome@2304",
//   "host":"20.124.123.153",
//   "port":"5432",
//   "dbname":"postgres"
// }


    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
     fetch("/create_project", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(listMetaDataAsync({ project_name: formData.project_name}));
        naviGate("/projects")
        //saveDataforSource();
         setStepperLoader(false);
         showToastMessage("success", data.status);
      });
  };

  const testConnection = (data) => {
    console.log(data, "data");
    setStepperLoader(true);
    let postdata = {};
    postdata = {
      ...data,
    };
    dispatch(testConnectionAsync(postdata));
  };

  useEffect(() => {
    if (
      storeResponse.testConnectionResponse !== undefined &&
      Object.keys(storeResponse.testConnectionResponse).length > 0
    ) {
      if (storeResponse.testConnectionResponse.status === 200) {
        if (
          storeResponse.testConnectionResponse.data.status ===
          "Connection Successful"
        ) {
          setStepperLoader(false);
          showToastMessage(
            "success",
            storeResponse.testConnectionResponse.data.status
          );
        } else {
          setStepperLoader(false);
          showToastMessage(
            "error",
            storeResponse.testConnectionResponse.data.status
          );
        }
      } else {
        setStepperLoader(false);
        showToastMessage(
          "error",
          storeResponse.testConnectionResponse.data.status
        );
      }
      dispatch(testConnectioResetAsync());
    }
  }, [storeResponse?.testConnectionResponse]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="stepper">
      <div className="breadcrumbs-heading">
        <BreadCrumbs breadData={breadData} />
        <div className="create-project">
          <h3>Create Projects</h3>
        </div>
      </div>
      <div className="Staper-container">
        <MainStaper>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "rigth" }}
          >
            <Alert
              onClose={handleClose}
              severity={message.status}
              variant="filled"
              sx={{ width: "30%" }}
              key={"top" + "right"}
            >
              {message.message}
            </Alert>
          </Snackbar>
          <ToastContainer />
          <div className="project-staper">
            {" "}
            <ProjectCircle
              projectProgress={projectProgress}
              projectProgressCircle={projectProgressCircle}
            >
              {projectProgressContent ? <img src={Check} /> : 1}
            </ProjectCircle>
            <ProjectName>Project</ProjectName>
          </div>
          <VerticalLineOne verticleLineOne={verticleLineOne}></VerticalLineOne>
          <div className="source-staper">
            <SourceCircle
              sourceProgress={sourceProgress}
              sourceProgressCircle={sourceProgressCircle}
            >
              {sourceProgressContent ? <img src={Check} /> : 2}
            </SourceCircle>
            <SourceName
              sourceProgress={sourceProgress}
              sourceProgressCircle={sourceProgressCircle}
            >
              Source
            </SourceName>
          </div>
          <VerticalLineTwo verticleLineTwo={verticleLineTwo}></VerticalLineTwo>
          <div className="target-staper">
            <TargetCircle
              targetProgress={targetProgress}
              targetProgressCircle={targetProgressCircle}
            >
              {targetProgressContent ? <img src={Check} /> : 3}
            </TargetCircle>
            <TargetName
              targetProgress={targetProgress}
              targetProgressCircle={targetProgressCircle}
            >
              Target
            </TargetName>
          </div>
        </MainStaper>
        <div className="pages-container">
          <div className="page-rendring">
            {stepperLoader && <Loader />}
            {projectProgress ? (
              <ProjectForm
                buttonText={buttonText}
                nextClick={nextClick}
                setDatabaseType={setDatabaseType}
              />
            ) : sourceProgress ? (
              Storage.getItem("source_database") === "Azure" ? (
                <SourceAzureForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("source_database") === "Oracle DB" ? (
                <SourceOracleForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("source_database") === "PostgreSQL" ? (
                <SourcePostgresForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("source_database") === "ADLS Gen 2" ? (
                <SourceAdlsForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("source_database") === "AWS S3" ? (
                <AwsS3Form
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : (
                ""
              )
            ) : targetProgress ? (
              true ? (
                <TargetAwsS3Form
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("target_database") === "ADLS Gen 2" ? (
                <TargetAdlsForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("target_database") === "Oracle DB" ? (
                <TargetOracleForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : Storage.getItem("target_database") === "PostgreSQL" ? (
                <TargetPostgresForm
                  testConnection={testConnection}
                  buttonText={buttonText}
                  nextClick={nextClick}
                  previousClick={previousClick}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          {/* <div className="buttons">
            <div className="staper-button-container">
              <Button
                buttonText={buttonText.text}
                background={buttonText.bgColor}
                color="white"
                clickHandler={nextClick}
              />
              {count !== 1 && (
                <Button buttonText="Previous" clickHandler={previousClick} />
              )}
            </div>
            {count !== 1 && (
              <Button
                buttonText="Test Connection"
                clickHandler={() => testConnection()}
              />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
