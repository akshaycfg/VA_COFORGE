import React, { useEffect, useRef } from "react";
import "./index.scss";
import styled from "styled-components";
import { useState } from "react";
import Button from "./../../../components/Button";
import Check from "../../../images/Check.svg";
import BreadCrumbs from "./../../../components/BreadCrumbs";
import CreateSchema from "./../CreateSchema";
import SchemaComparison from "./../SchemaComparison";
import SchemaMigration from "./../SchemaMigration";
import Table from "../../../components/Table";
import { useLocation } from "react-router";
import SchemaMaping from "../SchemaMaping";
import Report from "../Report";
import Storage from "../../../services/Storage";
import Loader from "../../../components/Loader";
import DataMigration from "../DataMigrations";
import PrepareMetaData from "../PrepareMetaData";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  convertDatatypesAsync,
  convertDatatypesResetAsync,
  executeDdlsAsync,
  executeDdlsResetAsync,
  generateDdlsAsync,
  generateDdlsResetAsync,
  getMetadataCompResetAsync,
  getMetadataCompaAsync,
  listSchemaTableResetAsync,
  listSchemaTablesAsync,
  listSchemasAsync,
  listSchemasResetAsync,
  prepareMetaDatatypesAsync,
  prepateMeatadatasaveResetAsync,
  saveSourceMetadataSchemaAsync,
  saveSourceMetadataSchemaResetAsync,
  selectSourceSchemasAsync,
  selectSourceSchemasResetAsync,
} from "../../../lib";
import HorizontalStepper from "../../../components/HorizontalStepper";
import { Alert, Snackbar } from "@mui/material";
const MainStaper = styled.div`
  width: 260px;
  border-right: 1px solid #c3c3c354;
  padding: 15px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  background-color: white;
`;
const PrepareMetaDataCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.PrepareMetaDataProgress
      ? "#001529"
      : props.metaDataCircle && "#ff7a45"};
  color: ${(props) =>
    props.PrepareMetaDataProgress
      ? "white"
      : props.metaDataCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.metaDataCircle ? "3px solid #ff7a45" : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.PrepareMetaDataProgress
        ? "black"
        : props.metaDataCircle
        ? "black"
        : ""};
  }
`;
const PrepareMetaDataName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.PrepareMetaDataProgress ? "600" : props.metaDataCircle ? "600" : ""};
`;
const SchemaCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.schemaProgress ? "#001529" : props.schemaProgressCircle && "#ff7a45"};
  color: ${(props) =>
    props.schemaProgress
      ? "white"
      : props.schemaProgressCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.schemaProgressCircle ? "3px solid #ff7a45" : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.schemaProgress
        ? "black"
        : props.schemaProgressCircle
        ? "black"
        : ""};
  }
`;
const SchemaName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.schemaProgress ? "600" : props.schemaProgressCircle ? "600" : ""};
`;
const SchemaMapingCircle = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.schemaMapingProgress
      ? "#001529"
      : props.schemaMapingProgressCircle && "#ff7a45"};
  color: ${(props) =>
    props.schemaMapingProgress
      ? "white"
      : props.schemaMapingProgressCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.schemaMapingProgressCircle
      ? "3px solid #ff7a45"
      : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.schemaMapingProgress
        ? "black"
        : props.schemaMapingProgressCircle
        ? "black"
        : ""};
  }
`;
const SchemaMapingName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.schemaMapingProgress
      ? "600"
      : props.schemaMapingProgressCircle
      ? "600"
      : ""};
`;

const SchemaCompariosnCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.schemaComprisonProgress
      ? "#001529"
      : props.schemaComparisonProgressCircle && "#ff7a45"};
  color: ${(props) =>
    props.schemaComprisonProgress
      ? "white"
      : props.schemaComparisonProgressCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.schemaComparisonProgressCircle
      ? "3px solid #ff7a45"
      : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.schemaComprisonProgress
        ? "black"
        : props.schemaComparisonProgressCircle
        ? "black"
        : ""};
  }
`;
const ComparisonName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.schemaComprisonProgress
      ? "600"
      : props.schemaComparisonProgressCircle
      ? "600"
      : ""};
`;
const AssessmentReportCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.assessmetProgress ? "#001529" : props.assessmetCircle && "#ff7a45"};
  color: ${(props) =>
    props.assessmetProgress
      ? "white"
      : props.assessmetCircle
      ? "white"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.assessmetCircle ? "3px solid #ff7a45" : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.assessmetProgress ? "black" : props.assessmetCircle ? "black" : ""};
  }
`;
const AssessmentName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.assessmetProgress ? "600" : props.assessmetCircle ? "600" : ""};
`;
const SchemaMigrationCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.schemaMigProgress ? "#001529" : props.schemaMigCircle && "#ff7a45"};
  color: ${(props) =>
    props.schemaMigProgress
      ? "white"
      : props.schemaMigCircle
      ? "#001529"
      : "black"};
  height: 30px;
  width: 30px;
  border: ${(props) =>
    props.schemaMigCircle ? "3px solid #ff7a45" : "3px solid #c3c3c3"};
  border-radius: 100%;
  span {
    color: ${(props) =>
      props.schemaMigProgress ? "black" : props.schemaMigCircle ? "black" : ""};
  }
`;
const MigrationName = styled.span`
  font-size: 12px;
  font-weight: ${(props) =>
    props.schemaMigProgress ? "600" : props.assessmetCircle ? "600" : ""};
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
const VerticalLineThree = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${(props) =>
    props.verticleLineThree ? "#ff7a45" : "#c3c3c385"};
  margin-left: 16px;
`;
const VerticalLineFour = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${(props) =>
    props.verticleLineFour ? "#ff7a45" : "#c3c3c385"};
  margin-left: 16px;
`;

const VerticalLineFive = styled.div`
  width: 2px;
  height: 20px;
  background-color: ${(props) =>
    props.VerticalLineFive ? "#ff7a45" : "#c3c3c385"};
  margin-left: 16px;
`;
const ManageStepper = () => {
  const { state } = useLocation();
  const [stepperLoader, setStepperLoader] = useState(false);
  const [migrationStepper, setMigrationStepper] = useState();
  const [projectList, setProjectList] = useState([]);
  const [PrepareMetaDataProgress, setPrepareMetaDataProgress] = useState(true);
  const [schemaProgress, setSchemaProgress] = useState(false);
  const [schemaMapingProgress, setSchemaMapingProgress] = useState(false);
  const [schemaComprisonProgress, setSchemaComparisonProgress] =
    useState(false);
  const [assessmetProgress, setAssessmentProgress] = useState(false);
  const [schemaMigProgress, setSchemaMigProgress] = useState(false);
  const [verticleLineOne, setVerticleLineOne] = useState(false);
  const [verticleLineTwo, setVerticleLineTwo] = useState(false);
  const [verticleLineThree, setVerticleLineThree] = useState(false);
  const [verticleLineFour, setVerticleLineFour] = useState(false);
  const [verticleLineFive, setVerticleLineFive] = useState(false);
  const [schemaProgressContent, setSchemaProgressContent] = useState(false);
  const [metaDataContent, setmetaDataContent] = useState(false);
  const [schemaMapingProgressContent, setSchemaMapingProgressContent] =
    useState(false);
  const [schemaComparisonProgressContent, setSchemaComparisonProgressContent] =
    useState(false);
  const [assessmetContent, setAssessmentContent] = useState(false);
  const [schemaMigContent, setSchemaMigContent] = useState(false);
  const [metaDataCircle, setMetaDataCircle] = useState(false);
  const [schemaProgressCircle, setSchemaCircle] = useState(false);
  const [schemaMapingProgressCircle, setSchemaMapingProgressCircle] =
    useState(false);
  const [schemaComparisonProgressCircle, setSchemaComparisonCircle] =
    useState(false);
  const [assessmetCircle, setAssessmentCircle] = useState(false);
  const [schemaMigCircle, setSchemaMigCircle] = useState(false);
  const [buttonText, setButtonText] = useState({
    text: "Next",
    bgColor: "#001529",
  });
  const [count, setCount] = useState(1);
  const [getState, setState] = useState([]);
  const [getSchema, setSchema] = useState([]);
  const [getTable, setTable] = useState([]);
  const [getSourceData, setSourceData] = useState([]);
  const [getTTDL, setTTDL] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: "", message: "" });
  const showToastMessage = (status, message) => {
    setOpen(true);
    setMessage({ status: status, message: message });
  };
  useEffect(() => {
    setProjectList([state]);
  }, []);
  const dispatch = useDispatch();
  const storeResponse = useSelector((state) => state.steppertReducer);
  const nextClick = () => {
    if (count === 1) {
      setCount(count + 1);
      setSchemaMapingProgress(true);
      setVerticleLineOne(true);
      setPrepareMetaDataProgress(false);
      setmetaDataContent(true);
      setMetaDataCircle(true);
      nextActionCall();
    } else if (count === 2) {
      setCount(count + 1);
      setSchemaComparisonProgress(true);
      setVerticleLineTwo(true);
      setSchemaMapingProgress(false);
      setSchemaMapingProgressContent(true);
      setSchemaMapingProgressCircle(true);
      getMetadataComp();
    } else if (count === 3) {
      setCount(count + 1);
      setAssessmentProgress(true);
      setVerticleLineThree(true);
      setSchemaComparisonProgress(false);
      setSchemaComparisonCircle(true);
      setSchemaComparisonProgressContent(true);
    } else if (count === 4) {
      setCount(count + 1);
      setMigrationStepper(0);
      setSchemaMigProgress(true);
      setVerticleLineFour(true);
      setAssessmentProgress(false);
      setAssessmentCircle(true);
      setAssessmentContent(true);
    } else if (count === 5) {
      setMigrationStepper(migrationStepper + 1);
      setCount(count + 1);
    } else if (count === 6) {
      setMigrationStepper(migrationStepper + 1);
      setCount(count + 1);
      setButtonText({ text: "Save", bgColor: "#ff7a45" });
    }
  };
  const previousClick = () => {
    if (count === 2) {
      setCount(count - 1);
      setSchemaMapingProgress(false);
      setVerticleLineOne(false);
      setPrepareMetaDataProgress(true);
      setmetaDataContent(false);
      setMetaDataCircle(false);
    } else if (count === 3) {
      setCount(count - 1);
      setSchemaComparisonProgress(false);
      setVerticleLineTwo(false);
      setSchemaMapingProgress(true);
      setSchemaMapingProgressContent(false);
      setSchemaMapingProgressCircle(false);
    } else if (count === 4) {
      setCount(count - 1);
      setAssessmentProgress(false);
      setVerticleLineThree(false);
      setSchemaComparisonProgress(true);
      setSchemaComparisonCircle(false);
      setSchemaComparisonProgressContent(false);
    } else if (count === 5) {
      setCount(count - 1);
      setMigrationStepper(0);
      setSchemaMigProgress(false);
      setVerticleLineFour(false);
      setAssessmentProgress(true);
      setAssessmentCircle(false);
      setAssessmentContent(false);
    } else if (count === 6) {
      setMigrationStepper(migrationStepper - 1);
      setCount(count - 1);
    } else if (count === 7) {
      setMigrationStepper(migrationStepper - 1);
      setCount(count - 1);
      setButtonText({ text: "Next", bgColor: "#001529" });
    }
  };

  const breadData = [
    { path: "projects", text: "Project " },
    { path: "", text: "Manage Project" },
  ];
  const tableHeaderData = [
    { header: "ProjectName" },
    { header: "Description" },
    { header: "Source Database" },
    { header: "Target Database" },
  ];

  const nextActionCall = () => {
    setStepperLoader(true);
    // let postData = { //comented by Rasid
    //   project_name: Storage.getItem("dataReq").project_name,
    // };
    // dispatch(listSchemaTablesAsync(postData));
  };

  useEffect(() => {
    if (
      storeResponse.listSchemaTablesResponse !== undefined &&
      Object.keys(storeResponse.listSchemaTablesResponse).length > 0
    ) {
      if (storeResponse.listSchemaTablesResponse.status === 200) {
        if (storeResponse.listSchemaTablesResponse.data.status !== undefined) {
          setStepperLoader(false);
          setTable([]);
        } else {
          setStepperLoader(false);
          setTable(storeResponse.listSchemaTablesResponse.data);
        }
      } else {
        setTable([]);
      }
      dispatch(listSchemaTableResetAsync());
    }
  }, [storeResponse?.listSchemaTablesResponse]);
  const getMetadataComp = () => {
    setStepperLoader(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    dispatch(getMetadataCompaAsync(postData));
  };

  useEffect(() => {
    if (
      storeResponse.getMetadataCompaResponse !== undefined &&
      Object.keys(storeResponse.getMetadataCompaResponse).length > 0
    ) {
      if (storeResponse.getMetadataCompaResponse.status === 200) {
        if (storeResponse.getMetadataCompaResponse.data.status !== undefined) {
          setSchema([]);
          setSourceData([]);
          Storage.setItem("metadata_comp", []);
        } else {
          console.log(
            storeResponse.getMetadataCompaResponse.data,
            "storeResponse.getMetadataCompaResponse.data"
          );
          setSchema(Object.keys(storeResponse.getMetadataCompaResponse.data));
          setSourceData(storeResponse.getMetadataCompaResponse.data);
          Storage.setItem(
            "metadata_comp",
            storeResponse.getMetadataCompaResponse.data
          );
        }
        setStepperLoader(false);
      } else {
        setStepperLoader(false);
        setSchema([]);
        setSourceData([]);
        Storage.setItem("metadata_comp", []);
      }
      dispatch(getMetadataCompResetAsync());
    }
  }, [storeResponse?.getMetadataCompaResponse]);

  const applyMaping = () => {
    setStepperLoader(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(postData),
    // };

    dispatch(convertDatatypesAsync(postData));
    // fetch("/convert_datatypes", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     showToastMessage("success", data.status);
    //     // alert(data.status);
    //     console.log(data.status, "data");
    //     setStepperLoader(false);
    //   });
  };

  const prepareMetadatasave = () => {
    setStepperLoader(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(postData),
    // };

    dispatch(prepareMetaDatatypesAsync(postData));
    // fetch("/convert_datatypes", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     showToastMessage("success", data.status);
    //     // alert(data.status);
    //     console.log(data.status, "data");
    //     setStepperLoader(false);
    //   });
  };
  useEffect(() => {
    if (
      storeResponse.metaDataClickResponse !== undefined &&
      Object.keys(storeResponse.metaDataClickResponse).length > 0
    ) {
      if (storeResponse.metaDataClickResponse.status === 200) {
        showToastMessage(
          "success",
          storeResponse.metaDataClickResponse.data.status
        );
        setStepperLoader(false);
      } else {
        showToastMessage("error", "Internal server error");
        setStepperLoader(false);
      }
      dispatch(prepateMeatadatasaveResetAsync());
    }
  }, [storeResponse?.metaDataClickResponse]);
  useEffect(() => {
    if (
      storeResponse.convertDatatypesResponse !== undefined &&
      Object.keys(storeResponse.convertDatatypesResponse).length > 0
    ) {
      if (storeResponse.convertDatatypesResponse.status === 200) {
        showToastMessage(
          "success",
          storeResponse.convertDatatypesResponse.data.status
        );
        setStepperLoader(false);
      } else {
        showToastMessage("error", "Internal server error");
        setStepperLoader(false);
      }
      dispatch(convertDatatypesResetAsync());
    }
  }, [storeResponse?.metaDataClickResponse]);

  //Generate ddl
  const generateDdls = () => {
    setStepperLoader(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(postData),
    // };
    dispatch(generateDdlsAsync(postData));
    // fetch("/generate_ddls", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status !== undefined) {
    //       setSchema([]);
    //       setTTDL([]);
    //     } else {
    //       setSchema(Object.keys(data));
    //       setTTDL(data);
    //     }
    //     console.log("generate_ddls", data);
    //     setStepperLoader(false);
    //   });
  };

  useEffect(() => {
    if (
      storeResponse.generateDdlsResponse !== undefined &&
      Object.keys(storeResponse.generateDdlsResponse).length > 0
    ) {
      if (storeResponse.generateDdlsResponse.status === 200) {
        console.log(storeResponse.generateDdlsResponse.data, "uiop");
        if (storeResponse.generateDdlsResponse.data.status !== undefined) {
          setSchema([]);
          setTTDL([]);
        } else {
          setSchema(Object.keys(storeResponse.generateDdlsResponse.data));
          setTTDL(storeResponse.generateDdlsResponse.data);
        }
        setStepperLoader(false);
      } else {
        setStepperLoader(false);
        setSchema([]);
        setTTDL([]);
      }
      dispatch(generateDdlsResetAsync());
    }
  }, [storeResponse?.generateDdlsResponse]);

  //extract Meta data and save

  const extractMetadataSave = () => {
    setStepperLoader(true);
    let postData = Storage.getItem("dataReq");
    dispatch(selectSourceSchemasAsync(postData));
  };

  useEffect(() => {
    let postData = Storage.getItem("dataReq");
    if (
      storeResponse.selectSourceSchemasResponse !== undefined &&
      Object.keys(storeResponse.selectSourceSchemasResponse).length > 0
    ) {
      if (storeResponse.selectSourceSchemasResponse.status === 200) {
        setStepperLoader(false);
        MetadataSave(postData);
      } else {
        setStepperLoader(false);
      }
      dispatch(selectSourceSchemasResetAsync());
    }
  }, [storeResponse?.selectSourceSchemasResponse]);

  useEffect(() => {
    if (
      storeResponse.saveSourceMetadataSchemaResponse !== undefined &&
      Object.keys(storeResponse.saveSourceMetadataSchemaResponse).length > 0
    ) {
      if (storeResponse.saveSourceMetadataSchemaResponse.status === 200) {
        // toast["success"](storeResponse.saveSourceMetadataSchemaResponse.data.status, {
        //   // position: toast.POSITION.TOP_RIGHT,
        // });
        showToastMessage(
          "success",
          storeResponse.saveSourceMetadataSchemaResponse.data.status
        );
        setStepperLoader(false);
      } else {
        showToastMessage("error", "Internal Server Error");
      }
      dispatch(saveSourceMetadataSchemaResetAsync());
    }
  }, [storeResponse?.saveSourceMetadataSchemaResponse]);

  const MetadataSave = (data) => {
    setStepperLoader(true);
    let postData = {
      project_name: data.project_name,
    };
    dispatch(saveSourceMetadataSchemaAsync(postData));
  };

  // Deploye schema migration
  const deploySchema = () => {
    setStepperLoader(true);
    let postData = {
      project_name: Storage.getItem("dataReq").project_name,
    };
    dispatch(executeDdlsAsync(postData));
  };

  useEffect(() => {
    if (
      storeResponse.executeDdlsResponse !== undefined &&
      Object.keys(storeResponse.executeDdlsResponse).length > 0
    ) {
      if (storeResponse.executeDdlsResponse.status === 200) {
        showToastMessage(
          "success",
          storeResponse.executeDdlsResponse.data.status
        );
        setStepperLoader(false);
      } else {
        showToastMessage("error", "Error! Internal server error");
        setStepperLoader(false);
      }
      dispatch(executeDdlsResetAsync());
    }
  }, [storeResponse?.executeDdlsResponse]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="stepper">
      <div className="breadcrumbs-heading">
        <BreadCrumbs breadData={breadData} />
        <div className="create-project">
          {/* <h4>{state.project_name && state.project_name }</h4> */}
        </div>
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
        <div className="basic-info-project">
          <h4 className="heading-basic-info">Project Basic Info</h4>
          {projectList.map((item) => {
            return (
              <div>
                <div className="project-info">
                  <div>ProjectName:</div>
                  <div>{item.project_name && item.project_name}</div>
                </div>
                <div className="project-info">
                  <div>Description:</div>
                  <div>{item.description}</div>
                </div>
                <div className="project-info">
                  <div>Source:</div>
                  <div>{item.source}</div>
                </div>
                <div className="project-info">
                  <div>Target:</div>
                  <div>{item.target}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Staper-container">
        <MainStaper>
          <div className="schema-staper">
            <PrepareMetaDataCircle
              PrepareMetaDataProgress={PrepareMetaDataProgress}
              metaDataCircle={metaDataCircle}
            >
              {metaDataContent ? <img src={Check} /> : 1}
            </PrepareMetaDataCircle>
            <PrepareMetaDataName
              PrepareMetaDataProgress={PrepareMetaDataProgress}
              metaDataCircle={metaDataCircle}
            >
              {state.metadata_source == "business_files"
                ? "Prepare Meta Data"
                : "Choose Schema"}
            </PrepareMetaDataName>
          </div>
          <VerticalLineOne verticleLineOne={verticleLineOne}></VerticalLineOne>
          {/* <div className="schema-staper">
            <SchemaCircle
              schemaProgress={schemaProgress}
              schemaProgressCircle={schemaProgressCircle}
            >
              {schemaProgressContent ? <img src={Check} /> : 2}
            </SchemaCircle>
            <SchemaName
              schemaProgress={schemaProgress}
              schemaProgressCircle={schemaProgressCircle}
            >
              Choose Schema
            </SchemaName>
          </div> */}

          <div className="schema-staper">
            <SchemaMapingCircle
              schemaMapingProgress={schemaMapingProgress}
              schemaMapingProgressCircle={schemaMapingProgressCircle}
            >
              {schemaMapingProgressContent ? <img src={Check} /> : 2}
            </SchemaMapingCircle>
            <SchemaMapingName
              schemaMapingProgress={schemaMapingProgress}
              schemaMapingProgressCircle={schemaMapingProgressCircle}
            >
              Schema Mapping
            </SchemaMapingName>
          </div>
          <VerticalLineTwo verticleLineTwo={verticleLineTwo}></VerticalLineTwo>
          <div className="schema-comparison">
            <SchemaCompariosnCircle
              schemaComprisonProgress={schemaComprisonProgress}
              schemaComparisonProgressCircle={schemaComparisonProgressCircle}
            >
              {schemaComparisonProgressContent ? <img src={Check} /> : 3}
            </SchemaCompariosnCircle>
            <ComparisonName
              schemaComprisonProgress={schemaComprisonProgress}
              schemaComparisonProgressCircle={schemaComparisonProgressCircle}
            >
              {" "}
              Schema Comparison
            </ComparisonName>
          </div>
          <VerticalLineThree
            verticleLineThree={verticleLineThree}
          ></VerticalLineThree>
          <div className="assessment-report">
            <AssessmentReportCircle
              assessmetProgress={assessmetProgress}
              assessmetCircle={assessmetCircle}
            >
              {assessmetContent ? <img src={Check} /> : 4}
            </AssessmentReportCircle>
            <AssessmentName
              assessmetProgress={assessmetProgress}
              assessmetCircle={assessmetCircle}
            >
              Schema Migration
            </AssessmentName>
          </div>
          <VerticalLineFour
            verticleLineFour={verticleLineFour}
          ></VerticalLineFour>
          <div className="schema-migration">
            <SchemaMigrationCircle
              schemaMigProgress={schemaMigProgress}
              schemaMigCircle={schemaMigCircle}
            >
              {schemaMigContent ? <img src={Check} /> : 5}
            </SchemaMigrationCircle>
            <MigrationName
              schemaMigProgress={schemaMigProgress}
              schemaMigCircle={schemaMigCircle}
            >
              Data Migration
            </MigrationName>
          </div>
        </MainStaper>
        <div className="pages-container">
          <div className="page-rendring-managestepper">
            {/* {stepperLoader && <Loader />} comment by rasid*/}
            {/* <Table tableHeaderData={tableHeaderData}/> */}
            {PrepareMetaDataProgress ? (
              state.metadata_source == "business_files" ? (
                <PrepareMetaData />
              ) : (
                <CreateSchema />
              )
            ) : schemaMapingProgress ? (
              <SchemaMaping getTable={getTable} />
            ) : schemaComprisonProgress ? (
              <SchemaComparison
                data={getState}
                getSchema={getSchema}
                getTable={getTable}
                getSourceData={getSourceData}
              />
            ) : schemaMigProgress ? (
              <DataMigration
                data={getState}
                getSchema={getSchema}
                getTable={getTable}
                getTTDL={getTTDL}
                migrationStepper={migrationStepper}
              />
            ) : assessmetProgress ? (
              <SchemaMigration
                data={getState}
                getSchema={getSchema}
                getTable={getTable}
                getSourceData={getSourceData}
                getTTDL={getTTDL}
              />
            ) : (
              ""
            )}
          </div>
          <div className="manage_stepper_buttons">
            <div className="staper-button-container">
              <Button
                buttonText={buttonText.text}
                background={buttonText.bgColor}
                color="white"
                clickHandler={nextClick}
                padding="6px 20px"
              />
              {count !== 1 && (
                <Button
                  buttonText="Previous"
                  clickHandler={previousClick}
                  padding="6px 20px"
                />
              )}
              <Button buttonText="Cancel" padding="6px 20px" />
            </div>
            {schemaComprisonProgress && (
              <Button
                background={"#f26a51"}
                color="white"
                buttonText="Save"
                clickHandler={() => alert("Save")}
              />
            )}
            {PrepareMetaDataProgress &&
              state.metadata_source == "business_files" && (
                <Button
                  background={"#f26a51"}
                  color="white"
                  buttonText="Prepare MetaData"
                  clickHandler={() => prepareMetadatasave()}
                />
              )}
            {schemaMapingProgress && (
              <Button
                background={"#f26a51"}
                color="white"
                clickHandler={() => applyMaping()}
                buttonText="Apply Mapping"
              />
            )}

            {PrepareMetaDataProgress && state.metadata_source == "sourceDB" && (
              <Button
                background={"#f26a51"}
                color="white"
                buttonText="Extract Metadata & Save"
                clickHandler={() => extractMetadataSave()}
              />
            )}
            {assessmetProgress && (
              <Button
                background={"#f26a51"}
                color="white"
                buttonText="Deploy Schema"
                clickHandler={() => deploySchema()}
              />
            )}
            {count === 6 && (
              <Button
                background={"#001529"}
                color="white"
                buttonText="Save Changes"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStepper;
