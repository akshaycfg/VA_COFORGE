import React from "react";
import styled from "styled-components";
import "./index.scss";
import InputSelector from "../InputSelector";
import Progress from "react-progressbar";
import ProgressScaleBar from "../ProgressScaleBar";
import ArrowLoader from "../ArrowLoader";
import CheckMark from "../CheckMark";
import CheckMarkFailed from "../CheckMarkFailed";

const TableContainer = styled.table``;

const ProgressBarContainer = styled.div`
  display: flex;
  gap: 0px;
  width: 60%;
`;

const MigrationTable = ({ data}) => {
  const HandlerChange = (e) => {
    const { name, value } = e.target;
  };
  return (
    <>
      <TableContainer className="data-table">
        <tr>
          <th>Table</th>
          <th>Migration</th>
          <th>Migration Progress</th>
        </tr>
        {data.map((item, index) => {
          return (
            <tr>
              <td>{item.table}</td>
              <td>{item.Migration}{""}{item.Migration==="RUNNING"?<ArrowLoader/>:item.Migration==="SUCCESS"?<CheckMark/>:item.Migration==="FAILED"?<CheckMarkFailed/>:""}</td>
              <td>
                <div></div>
                <div className="table-progress-bar">
                  <ProgressScaleBar
                    scale={100}
                    width="100px"
                    status={item.Migration}
                    Text=""
                  />
                </div>
              </td>

              {/* <td><InputSelector
          optionValue={["1"]}
          name="target_datatype"
          selectLabel={item.TargetDatatype}
          // labelText={"Select Schema"}
          onChange={HandlerChange}
        /></td> */}
            </tr>
          );
        })}
      </TableContainer>
    </>
  );
};

export default MigrationTable;
