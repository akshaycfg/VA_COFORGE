import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import "./index.scss";
import assending from "./../../images/assending.svg";
import dessending from "./../../images/dessending.svg";
import actionItem from "./../../images/actionItem.svg"
const TableContainer = styled.table``;
const Table = ({ data, tableHeaderData, actionName, handleManageClick }) => {
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
                {/* {item.header !== "Actions" &&
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
        {tableData.length !== 0 &&
          tableData?.map((item, index) => {
            return (
              <tr>
                <td>{item.project_name}</td>
                <td>{item.description}</td>
                <td>{item.source}</td>
                <td>{item.target}</td>
                {tableHeaderData[4]?.header === "Created By" && (
                  <td>{item.created_by}</td>
                )}
                {tableHeaderData[5]?.header === "Created Date" && (
                  <td>{item.created_date}</td>
                )}
                {actionName ? (
                  <td>
                    <div
                      // className="manage-button"
                      onClick={() => ClickHandler(item)}
                    >
                     <img src={actionItem} width="20" height="20"  />
                      {" "}
                      {/* {actionName} */}
                    </div>
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

export default Table;
