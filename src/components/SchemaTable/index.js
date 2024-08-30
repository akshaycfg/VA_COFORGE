import React, { useState } from "react";
import styled from "styled-components";
import "./index.scss";
import InputSelector from "../InputSelector";
import PrimaryKeyIcon from "../PrimaryKeyIcon";
import ForeignKeyIcon from "../ForeignKeyIcon";

const TableContainer = styled.table``;
const SchemaTable = ({ data }) => {
  const [toolTipShow, setToolTip] = useState(false);
  const HandlerChange = (e) => {
    const { name, value } = e.target;
  };
  const handleMouseIn = () => {
    console.log("Mouse in");
    setToolTip(true);
  };
  const handleMouseOut = () => {
    console.log("Mouse out");
    setToolTip(false);
  };
  return (
    <>
      <TableContainer className="data-table">
        <tr>
          <th>Column</th>
          <th>Source Datatype</th>
          <th>Recommended Target Datatype</th>
          {/* <th>User Change</th> */}
        </tr>
        {data.map((item, index) => {
          return (
            <tr>
              <td>{item.name}{" "}{item?.foreign_key !==undefined&&<div class="tooltip"><ForeignKeyIcon/><span class="tooltiptext"><p>{"Column :"+ item.foreign_key_ref.column}</p><p>{"Schema :"+ item.foreign_key_ref.schema}</p><p>{"Table :"+ item.foreign_key_ref.table}</p>
              </span></div>} {item?.primary_key!==undefined&&<PrimaryKeyIcon/>}
              
      
              </td>
              <td>{item.source_data_type}</td>
              <td>{item.target_datatype}</td>
              {/* <td>
                <InputSelector optionValue={["", "user1", "user2"]} />
              </td> */}
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

export default SchemaTable;
