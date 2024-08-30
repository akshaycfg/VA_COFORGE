import React, { useEffect, useState } from "react";
import ReportTable from "../.././../../components/ReportTable";
import { Grid } from "@mui/material";
import "./index.scss";
import InputSelector from "../../../../components/InputSelector";
import { computeSchemawiseData, computeOverAllData } from "./charts-helper";
import GaugeGraph from "../../../../components/GuageGraph";
import RadialGraph from "../../../../components/RadialGraph";

const colors = ["#7e372a", "#f8b2a5", "#f26a51"];

const OverAllReport = ({ data, representFormate }) => {
  const [tabularFormat, setTabularFormate] = useState(false);
  const [selector, setSelector] = useState("");
  const [getSelectRadio, setSelectRadio] = useState("Overall");
  const [getSchema, setSchema] = useState([]);
  const [getTablesdata, setTablesdata] = useState([]);
  const [guageData, setGuagedata] = useState(0);
  const [getRadialData, setRadialData] = useState([]);
  const [guageDataSchemaWise, setGuagedataSchemaWise] = useState(0);
  const [getRadialDataSchemaWise, setRadialDataSchemaWise] = useState([]);
  const onChangeHandler = (e) => {
    setSelectRadio(e.target.value);
  };
  const computeChartData = (data) => {
    const overAll = computeOverAllData(data);
    setSchema(overAll?.schemas);
    setTablesdata(overAll?.tableData);
    setGuagedata(overAll?.guagePercentage);
    setRadialData(overAll?.obj);
  };
  useEffect(() => {
    computeChartData(data);
    return () => {
      setRadialData([]);
      setSelector("");
      setGuagedataSchemaWise([]);
      setRadialDataSchemaWise([]);
    };
  }, [data]);

  const graphicalRepreset = () => {
    setTabularFormate(false);
  };
  const tabularFormate = () => {
    setTabularFormate(true);
  };
  const HandlerChange = (e) => {
    setSelector(e.target.value);
    const schemaWise = computeSchemawiseData(data, e.target.value);
    setGuagedataSchemaWise(schemaWise?.guagePercentage);
    setRadialDataSchemaWise(schemaWise?.obj);
  };
  let tableFilter = ["table1", "table2"];
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
            />
          )}
        </div>
        {tabularFormat ? (
          <div>
            {" "}
            <ReportTable data={getTablesdata} status={"overallmig"} />
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
                    onChange={HandlerChange}
                    //  value={selector}
                  />
                )}
              </div>
              <button>Download Reconciliation Report</button>
            </div>
            <div className="overall-migration-graph">
              <Grid container spacing={2}>
                {getSelectRadio === "SchemaWise" && selector !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div className="report-chart-wrapper">
                      <Grid
                        item
                        xs={6}
                        md={6}
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <GaugeGraph
                          config={{
                            width: 290,
                            height: 290,
                            value: guageDataSchemaWise,
                            startAngle: guageDataSchemaWise - 10,
                            endAngle: 450,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={6}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <RadialGraph
                          chartData={getRadialDataSchemaWise}
                          colors={colors}
                          offSetX={50}
                        />
                      </Grid>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <div className="report-chart-wrapper">
                      <Grid
                        item
                        xs={6}
                        md={6}
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <GaugeGraph
                          config={{
                            width: 290,
                            height: 290,
                            value: guageData,
                            startAngle: guageData - 10,
                            endAngle: 450,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        md={6}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <RadialGraph
                          chartData={getRadialData}
                          colors={colors}
                          offSetX={0}
                        />
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

export default OverAllReport;
