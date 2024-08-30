import React from "react";
import "./index.scss";

const ReportTable = ({ data, status }) => {
  return (
    <>
      <table className="data-table">
        {status === "overall" ? (
          <tr>
            <th>Schema</th>
            <th>Table</th>
            <th>Source Count</th>
            <th>Staging Count</th>
            <th>Target Count</th>
          </tr>
        ) : (
          <tr>
            <th>Schema</th>
            <th>Table</th>
            <th>Migration Status</th>
          </tr>
        )}
        {data.map((item, index) => {
          return status === "overall" ? (
            <tr>
              <td>{item.schema}</td>
              <td>{item.tablename}</td>
              <td>{item.source}</td>
              <td>{item.staging}</td>
              <td>{item.target}</td>
            </tr>
          ) : (
            <tr>
              <td>{item.schema}</td>
              <td>{item.tablename}</td>
              <td>{item.migrationStatus}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default ReportTable;
