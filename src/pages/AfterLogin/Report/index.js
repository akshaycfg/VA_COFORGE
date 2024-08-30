import React, { useEffect, useState } from "react";
import InputSelector from "../../../components/InputSelector";
import "./index.scss";
import ReportTable from "../../../components/ReportTable";
import Chart from "./../../../components/Chart";
import RadialGraph from "../../../components/RadialGraph";
import PieCharts from "../../../components/PieCharts";
import GaugeGraph from "../../../components/GuageGraph";

import OverAllReport from "./OverAllReport";
import Reconciliation from "./Reconsiliation";
import Tabs from "../../../components/Tabs/Tabs";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { viewReportAsync, viewReportResetAsync } from "../../../lib";
import { useDispatch, useSelector } from "react-redux";

const Report = (props) => {
  const { projectname } = useParams();
  const [tabularFormat, setTabularFormate] = useState(false);
  const [selector, setSelector] = useState("Reconciliation");
  const [getData, setData] = useState([]);
  const reportOptions = [" ", "Reconciliation", "Overall Migration Report"];
  const dispatch =useDispatch();
  const storeResponse = useSelector((state) => state.steppertReducer);
  const tableData = [
    {
      schema: "Schema1",
      table: "image",
      sourceCount: "3",
      stagingCount: "5",
      targetCount: "2",
    },
    {
      schema: "Schema2",
      table: "table2",
      sourceCount: "3",
      stagingCount: "4",
      targetCount: "4",
    },
    {
      schema: "Schema3",
      table: "image",
      sourceCount: "2",
      stagingCount: "1",
      targetCount: "5",
    },
    {
      schema: "Schema4",
      table: "image",
      sourceCount: "4",
      stagingCount: "6",
      targetCount: "3",
    },
  ];
  const graphicalRepreset = () => {
    setTabularFormate(false);
  };
  const tabularFormate = () => {
    setTabularFormate(true);
  };
  const HandlerChange = (e) => {
    setSelector(e.target.value);
  };
  const viewReport = (ProjectName) => {
    console.log(ProjectName, "ProjectName");
    let postData = {
      project_name: ProjectName,
    };
    dispatch(viewReportAsync(postData))
  };
  useEffect(()=>{
    if (storeResponse.viewReportResponse !== undefined &&
      Object.keys(storeResponse.viewReportResponse).length > 0) {
      if (storeResponse.viewReportResponse.status === 200) {
        setData(storeResponse.viewReportResponse.data)
      }else{
        setData([])
      }
      dispatch(viewReportResetAsync())
    }
},[storeResponse?.viewReportResponse])
  useEffect(() => {
    viewReport(projectname);
  }, []);

  const tabs = [
    {
      title: "Reconciliation",
      active: true,
      iconClass: "fab fa-html5",
      content: (
        <Reconciliation data={getData} representFormate={tabularFormat} />
      ),
    },
    {
      title: "Over All Migration",
      active: false,
      iconClass: "fab fa-css3",
      content: (
        <OverAllReport data={getData} representFormate={tabularFormat} />
      ),
    },
  ];
  return (
    <>
      <div className="project-container">
        <div className="report-heading-part">
          <h3>Report</h3>
          <div className="report-dropdown">
          </div>
        </div>
        <div className="report-table-container"></div>
        <div className="report-table-container">
          <Tabs tabs={tabs} />;
        </div>
      </div>
    </>
  );
};

export default Report;
