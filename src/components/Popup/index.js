import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "./index.scss";
import Button from "../Button";
let columnData = [
  { name: "column 1", checked: true },
  { name: "column 2", checked: true },
  { name: "column 3", checked: true },
  { name: "column 4", checked: true },
  { name: "column 5", checked: true },
  { name: "column 6", checked: false },
  { name: "column 7", checked: false },
  { name: "column 8", checked: false },
  { name: "column 9", checked: true },
];
const PopupDialog = () => {
  const [popupData, setData] = useState([]);
  useEffect(() => {
    setData([...columnData]);
  }, []);
  const handleOnChange = (e, index) => {
    let data = popupData;
    data[index] = { ...data[index], checked: e.target.checked };
    setData([...data]);
  };
  useEffect(() => {}, [popupData]);
  return (
    <Popup
      trigger={<button className="add-more-column">+ Add More Column</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <div className="popup-header">
            <div className="column-list-text">Column List</div>
            <button className="close" onClick={close}>
              Save
            </button>
          </div>

          <div className="popup-container">
            {popupData.map((item, index) => {
              return (
                <div
                  className={`column-list ${item.checked ? "activeclass" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) =>
                      handleOnChange(e, index, "Project-checkbox")
                    }
                  />
                  <span>{item.name}</span>{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Popup>
  );
};
export default PopupDialog;
