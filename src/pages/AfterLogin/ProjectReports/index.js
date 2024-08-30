import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import "./index.scss";
import Union from "../../../images/Union.png";
import Loader from "./../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import InputSelector from "../../../components/InputSelector";
import Input from "../../../components/Input";
import search from "../../../images/search.svg";
import {
  projectListAsync,
  resetProjectActionAsync,
} from "../../../lib/projects";
import ListItem from "../../../components/ListItem";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
const ProjectReports = () => {
  let dispatch = useDispatch();
  const [projectList, setProjectList] = useState([]);
  const [loader, setLoder] = useState(false);
  const [genLoader, setGenLoder] = useState(false);
  const [getSearch, setSearch] = useState(0);
  const [getSearchReq, setSearchReq] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getprojectforgenerate, setprojectforgenerate] = useState("");
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projectList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const databaseType = [
    "",
    "Oracle DB",
    "PostgreSQL",
    "ADLS Gen 2",
    "Azure Synapse Analytics",
  ];
  const targetData = [
    "",
    "Oracle DB",
    "PostgreSQL",
    "ADLS Gen 2",
    "Azure Synapse Analytics",
  ];
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  //pagination
  const nPages = Math.ceil(projectList.length / recordsPerPage);
  const addNewProject = () => {
    naviGate("/stepper");
  };
  // list of projects
  const projectsListResponse = useSelector(
    (state) => state.projectsList.projectListResponse
  );
  useEffect(() => {
    console.log(projectsListResponse, "projectsListResponse");
    setLoder(true);
    dispatch(projectListAsync());
  }, [getSearch, getSearchReq]);
  // response handeling
  useEffect(() => {
    if (
      projectsListResponse !== undefined &&
      Object.keys(projectsListResponse).length > 0
    ) {
      if (projectsListResponse.status === 200) {
        if (getSearchReq.length !== 0) {
          let data = [];
          if (getSearchReq.search !== "") {
            data = projectsListResponse.data.filter(
              (x) => x["project_name"] === getSearchReq.search
            );
          } else {
            data = projectsListResponse.data.filter(
              (x) =>
                x["source"] === getSearchReq.source &&
                x["target"] === getSearchReq.target
            );
          }
          setProjectList(data);
          console.log(data, "Data", currentRecords);
        } else {
          setProjectList([...projectsListResponse.data]);
        }
        setLoder(false);
      } else {
        setLoder(false);
        setProjectList([]);
      }
      dispatch(resetProjectActionAsync());
    }
  }, [projectsListResponse, getSearchReq, currentRecords]);

  const naviGate = useNavigate();
  const handleManage = (item) => {
    // viewReport(item)
    naviGate(`/reportchart/${item}`);
  };
  const tableHeaderData = [
    { header: "ProjectName", name: "project_name" },
    { header: "Description", name: "description" },
    { header: "Source Database", name: "source" },
    { header: "Target Database", name: "target" },
    { header: "Created By", name: "createdby" },
    { header: "Created Date", name: "createddate" },
    { header: "Reports" },
  ];
  const showToastMessage = (status, message) => {
    toast[status](message, {
      // position: toast.POSITION.TOP_RIGHT,
    });
  };
  const generateReport = (ProjectName) => {
    setprojectforgenerate(ProjectName);
    setGenLoder(true);
    let postData = {
      project_name: ProjectName,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/generate_reconciliation_data", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        setGenLoder(false);
        if (response.gen_flag === true) {
          showToastMessage("success", response.status);
        } else {
          showToastMessage("error", response.status);
        }
      });
  };

  const viewReport = (ProjectName) => {
    console.log(ProjectName, "ProjectName");
    let postData = {
      project_name: ProjectName,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(postData),
    };
    fetch("/view_reports", requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response));
  };

  const HandlerChange = (e) => {
    console.log(e.target.value);
    setSearch(e);
  };

  const onSubmit = (datas) => {
    setSearchReq(datas);
  };
  return (
    <>
      <div className="project-container">
        {/* <Header/>
        <SideNav/> */}
        <div className="project-heading-part">
          <h2>Reports</h2>
          {/* <Button
            clickHandler={addNewProject}
            buttonText="Add New Project"
            background="white"
            color="black"
            image={Union}
          /> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="filter-drop-downs">
            <InputSelector
              optionValue={databaseType}
              name="source"
              selectLabel="Source DataBase"
              onChange={HandlerChange}
              reference={register("source")}
            />
            <InputSelector
              optionValue={targetData}
              name="target"
              selectLabel="Target DataBase"
              onChange={HandlerChange}
              reference={register("target")}
            />
            <div className="search-input">
              <Input
                name={"search"}
                placeholder={"search by project name"}
                // onChange={HandlerChange}
                reference={register("search")}
              />
            </div>

            <div className="search-button">
              <button>
                <img src={search} width="20" height="20"></img>
              </button>
            </div>
            {/* <Button
              clickHandler={() => {
                setSearch(getSearch + 1);
                setSearchReq([]);
                document.getElementsByName("search").value = "";
              }}
              buttonText="Reset"
              background={"#ff7a45"}
              color={"white"}
              margin={"7px"}
            /> */}
          </div>
        </form>
        <ToastContainer />
        <div className="project-table-container">
          {loader && <Loader />}
          <ListItem
            data={currentRecords}
            tableHeaderData={tableHeaderData}
            actionName="View"
            handleManageClick={(items) => handleManage(items)}
            generateReport={(items) => generateReport(items)}
            loaderStatus={genLoader}
            getprojectforgenerate={getprojectforgenerate}
          />
          <div className="pagination-container">
            {nPages !== 0 && (
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectReports;
