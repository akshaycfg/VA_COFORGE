import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./index.scss";
import assending from "./../../images/assending.svg";
import dessending from "./../../images/dessending.svg";
import ArrowLoader from "../ArrowLoader";
import Reconciliation from "./../../images/Reconciliation.svg";
import FundView from "./../../images/FundView.svg";
const TableContainer = styled.table``;

const ListItem = ({
  data,
  tableHeaderData,
  actionName,
  handleManageClick,
  generateReport,
  loaderStatus,
  getprojectforgenerate,
}) => {
  const [tableData, setData] = useState([]);
  const [sortStatus, setSortStatus] = useState("ASC");
  const ClickHandler = (item) => {
    handleManageClick(item);
  };
  const sortTableData = (item, status) => {
    if (status == "ASC") {
      setSortStatus("DESC");
      let tableRow = [...data];
      let Array = tableRow.sort(function (a, b) {
        if (a[item] < b[item]) {
          return -1;
        }
        if (a[item] > b[item]) {
          return 1;
        }
        return 0;
      });
      setData(Array);
    } else {
      setSortStatus("ASC");
      let tableRow = [...data];
      let Array = tableRow.sort(function (a, b) {
        if (a[item] > b[item]) {
          return -1;
        }
        if (a[item] < b[item]) {
          return 1;
        }
        return 0;
      });
      setData(Array);
    }
  };
  useEffect(() => {
    console.log("data:::", data);
    setData([...data]);
  }, [data]);
  return (
    <>
      <TableContainer className="data-table">
        <tr>
          {tableHeaderData?.map((item) => (
            <th>
              <div className="header-class">
                {item.header}
                {/* {item.header !== "Reports" &&
                  (sortStatus === "ASC" ? (
                    <img
                      src={assending}
                      height="15"
                      width="15"
                      onClick={() => sortTableData(item.name, sortStatus)}
                    />
                  ) : (
                    <img
                      src={dessending}
                      height="15"
                      width="15"
                      onClick={() => sortTableData(item.name, sortStatus)}
                    />
                  ))} */}
              </div>
            </th>
          ))}
        </tr>
        {tableData?.map((item, index) => {
          return (
            <tr>
              <td>{item.project_name}</td>
              <td>{item.description}</td>
              <td>{item.source}</td>
              <td>{item.target}</td>
              {tableHeaderData[4].header === "Created By" && (
                <td>{item.created_by}</td>
              )}
              {tableHeaderData[5].header === "Created Date" && (
                <td>{item.created_date}</td>
              )}
              {actionName ? (
                <td>
                  <div className="t-row">
                    <div onClick={() => generateReport(item.project_name)}>
                      <img src={Reconciliation} />
                      {loaderStatus &&
                        getprojectforgenerate === item.project_name && (
                          <ArrowLoader />
                        )}
                    </div>{" "}
                    <div className="image-seprator"></div>
                    <div onClick={() => ClickHandler(item.project_name)}>
                      <img src={FundView} />
                    </div>{" "}
                  </div>{" "}
                </td>
              ) : (
                ""
              )}
            </tr>
          );
        })}
      </TableContainer>
      {tableData.length === 0 && (
        <div className="nrc">{"No Records Found"}</div>
      )}
    </>
  );
};

export default ListItem;
