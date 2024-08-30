import React, { useEffect, useState } from "react";
import Chart from "../../../../components/Chart";
import PieCharts from "../../../../components/PieCharts";
import ReportTable from "../.././../../components/ReportTable";
import { Grid } from "@mui/material";
import "./index.scss";
import InputSelector from "../../../../components/InputSelector";
import {
  computeSchemawiseData,
  computeTableWiseData,
  computeOverAllData,
} from "./charts-helper";

const Reconciliation = ({ data }) => {
  const [calculateData, setCalculatedata] = useState([]);
  const [tabularFormat, setTabularFormate] = useState(false);
  const [selector, setSelector] = useState("");
  const [getSelectRadio, setSelectRadio] = useState("Overall");
  const [getSchema, setSchema] = useState([]);
  const [schemawiseData, setSchemawiseData] = useState([]);
  const [selectedSchemaData, setSelectedSchemaData] = useState({});
  const [schemasForBarChart, setSchemasForBarChart] = useState({});
  const [tablesForBarChart, setTablesForBarChart] = useState({});
  const [getTablesdata, setTablesdata] = useState([]);

  const onChangeHandler = (e) => {
    setSelector("");
    setSelectRadio(e.target.value);
  };
  let tableFilter = ["table1", "table2"];
  const computeChartData = (data) => {
    const overAll = computeOverAllData(data);
    const schemaWise = computeSchemawiseData(data);
    setSchema(overAll?.schemas);
    setCalculatedata(overAll?.data);
    setSchemawiseData(schemaWise?.schemas);
    setSchemasForBarChart({
      labels: schemaWise?.labels,
      datasets: schemaWise?.datasets,
    });
    setTablesdata(overAll?.tableData);
  };
  useEffect(() => {
    computeChartData(data);
  }, [data]);

  const graphicalRepreset = () => {
    setTabularFormate(false);
  };
  const tabularFormate = () => {
    setTabularFormate(true);
  };
  const handleChange = (e) => {
    setSelector(e.target.value);
    // chartData(e.target.value);
    const filteredSchema = schemawiseData.find(
      (schema) => schema?.name === e.target.value
    );
    setSelectedSchemaData(filteredSchema);
    const tablesWise = computeTableWiseData(
      data?.reconciliation_data,
      filteredSchema?.name
    );
    setTablesForBarChart({
      labels: tablesWise?.labels,
      datasets: tablesWise?.datasets,
    });
  };
  const selection = (val) => {
    console.log(val);
  };
  //   let countSource = 0;
  //   let countStaging = 0;
  //   let countTarget = 0;
  //   let obj = {};
  //   let ar = [];
  //   let tableData = [];
  //   if (data.length !== 0) {
  //     let tableArray = Object.keys(data.reconciliation_data[selectedDb]);
  //     setSchema(Object.keys(data.reconciliation_data));
  //     for (let x of tableArray) {
  //       countSource +=
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .source_count !== "error" &&
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .source_count;
  //       countStaging +=
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .staging_count !== "error" &&
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .staging_count;
  //       countTarget +=
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .target_count !== "error" &&
  //         data.reconciliation_data[Object.keys(data.reconciliation_data)][x]
  //           .target_count;

  //     }

  //     obj.labels = Object.keys(data.reconciliation_data);
  //     obj.datasets = [countSource, countStaging, countTarget];

  //     setchartData(obj);
  //     // setCalculatedata(obj)
  //     console.log(obj, "countSource");
  //   }
  // };

  return (
    <>
      <div className="Reconciliation-report">
        <div className="report-dropdown">
          <div className="representation-formate">
            <button
              onClick={graphicalRepreset}
              className={!tabularFormat ? "active" : ""}
            >
              Graphical Representation
            </button>
            <button
              onClick={tabularFormate}
              className={tabularFormat ? "active" : ""}
            >
              Tabular Format
            </button>
          </div>
          {tabularFormat && (
            <InputSelector
              optionValue={tableFilter}
              name="Table"
              selectLabel="Table"
              onChange={handleChange}
            />
          )}
        </div>
        {tabularFormat ? (
          <div>
            {" "}
            <ReportTable data={getTablesdata} status={"overall"}/>
          </div>
        ) : (
          <div className="reconciliation-chart">
            <div className="radio-btn-download-btn">
              <div className="radio-button">
                <input
                  type="radio"
                  id="Overall"
                  value="Overall"
                  name="radio"
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  checked={getSelectRadio === "Overall" && true}
                />{" "}
                <label for="Overall">OverAll</label>
                <input
                  type="radio"
                  id="SchemaWise"
                  value="SchemaWise"
                  name="radio"
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  checked={getSelectRadio === "SchemaWise" && true}
                />{" "}
                <label for="SchemaWise"> Schema Wise</label>
              </div>
              <div>
                {getSelectRadio === "SchemaWise" && (
                  <InputSelector
                    optionValue={getSchema}
                    name="schema"
                    selectLabel="Schema"
                    onChange={handleChange}
                  />
                )}
              </div>
              <button>Download Reconciliation Report</button>
            </div>
            <div className="reconciliation-graph">
              <Grid container spacing={2}>
                {getSelectRadio === "SchemaWise" ? (
                  <Grid item xs={12} md={12}>
                    {selector && (
                      <div className="report-chart-wrapper">
                        <Grid item xs={12} md={5}>
                          <PieCharts data={selectedSchemaData} />
                        </Grid>
                        <Grid item xs={12} md={7}>
                          <section className="chart-container-wrapper">
                            <Chart
                              chartData={tablesForBarChart}
                              customWidth={
                                tablesForBarChart?.labels?.length * 125
                              }
                            />
                          </section>
                        </Grid>
                      </div>
                    )}
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <div className="report-chart-wrapper">
                      <Grid item xs={12} md={5}>
                        <PieCharts data={calculateData} />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Chart chartData={schemasForBarChart} />
                      </Grid>
                    </div>
                  </Grid>
                )}
              </Grid>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reconciliation;
