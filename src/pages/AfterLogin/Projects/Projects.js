import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import "./Projects.scss";
import Union from "../../../images/Union.png";
import Loader from "./../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import InputSelector from "../../../components/InputSelector";
import Input from "../../../components/Input";
import search from "../../../images/search.svg";
// import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import {
  projectListAsync,
  resetProjectActionAsync,
} from "../../../lib/projects";
import { useForm } from "react-hook-form";
const Projects = () => {
  let dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [projectList, setProjectList] = useState([]);
  const [loader, setLoder] = useState(false);
  const [getSearch, setSearch] = useState(0);
  const [getSearchReq, setSearchReq] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
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
  const currentRecords = projectList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
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
    naviGate(`/managestepper/${item.project_name}/${item.metadata_source}`, { state: item });
  };
  const tableHeaderData = [
    { header: "ProjectName", name: "project_name" },
    { header: "Description", name: "description" },
    { header: "Source Database", name: "source" },
    { header: "Target Database", name: "target" },
    { header: "Created By", name: "createdby" },
    { header: "Created Date", name: "datetime" },
    { header: "Actions" },
  ];
  const HandlerChange = (e) => {
    console.log("selected values", e.target.value);
    setSearch(e);
  };

  const onSubmit = (datas) => {
    setSearchReq(datas);
  };

  function filterUsers(users, filter) {
    var result = [];
    for (var prop in filter) {
      if (filter.hasOwnProperty(prop)) {
        //at the first iteration prop will be address
        for (var i = 0; i < filter.length; i++) {
          if (users[i][prop] === filter[prop]) {
            result.push(users[i]);
          }
        }
      }
    }
    return result;
  }
  return (
    <>
      <div className="project-container">
        {/* <Header/>
        <SideNav/> */}
        <div className="project-heading-part">
          <h2>Projects</h2>
          <Button
            clickHandler={addNewProject}
            buttonText="Add New Project"
            background="white"
            color="black"
            image={Union}
          />
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
            <InputSelector
              optionValue={targetData}
              name="date"
              selectLabel="Created Date"
              onChange={HandlerChange}
              reference={register("target")}
            />
            <div className="search-input-button">
              <Input
                name={"search"}
                // onChange={HandlerChange}
                reference={register("search")}
                placeholder={"Search by any keyword"}
              />
              {/* <div className="date-picker">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div> */}
              <div className="search-button">
                <button>
                  <img src={search} width="20" height="20"></img>
                </button>
              </div>
            </div>
            {/* <Button
              buttonText="Reset"
              clickHandler={() => { setSearch(getSearch + 1); setSearchReq([]) }}
              background={"#ff7a45"}
              color={"white"}
              margin={"7px"}
            /> */}
          </div>
        </form>
        <div className="project-table-container">
          {loader && <Loader />}
          <Table
            data={currentRecords}
            tableHeaderData={tableHeaderData}
            actionName="Manage"
            handleManageClick={(items) => handleManage(items)}
          />
          <div className="pagination-container">
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
