import React from "react";

import "./index.scss";
import ForeignKeyIcon from "../ForeignKeyIcon";
import PrimaryKeyIcon from "../PrimaryKeyIcon";

const SchemaComparisonTable = ({ name, data, zoom,getTTDL,schema }) => {
  return (
    <>
      <div
        className={`${
          zoom === 3
            ? "zoom-3"
            : zoom === 2
            ? "zoom-2"
            : zoom === 1
            ? "zoom-1"
            : "zoom-0"
        } comparison-table-box`}
      >
        
      
      <div className="tooltip"><div className="table-heading">{name[0]}</div> <span class="tooltiptext">{getTTDL[schema][name[0]]}</span></div>
        <div className="table-info-container">
          {data[name[0]]?.columns.map((item, index) => {
            return (
              <div className="table-info">
                <div className="name"   {...item?.foreign_key !== undefined && <ForeignKeyIcon />}> 
                  {item?.foreign_key !== undefined && <ForeignKeyIcon />}{" "}
                  {item?.primary_key !== undefined && <PrimaryKeyIcon />}
                  {item.name}
                </div>
                <div className="type">{item.source_data_type}</div>
                {/* {item?.foreign_key !==undefined&&<div class="tooltip"><ForeignKeyIcon/><span class="tooltiptext"><p>{"Column :"+ item.foreign_key_ref.column}</p><p>{"Schema :"+ item.foreign_key_ref.schema}</p><p>{"Table :"+ item.foreign_key_ref.table}</p>
              </span></div>} {item?.primary_key!==undefined&&<PrimaryKeyIcon/>} */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SchemaComparisonTable;
