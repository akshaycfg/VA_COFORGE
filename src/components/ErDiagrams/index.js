import React, { useEffect, useState } from "react";
import Mermaid from "./mermaid";
import erdiagramcode from "./erdiagramcode";
import Button from "../Button";
import zoomin from "../../images/zoom-in.svg";
import zoomout from "../../images/zoom-out.svg";
import Loader from "../Loader";
import "./index.scss";
const ErDiagram = ({getErdVal}) => {
  const [btnText, setText] = useState({
    zoomIn: "Min",
    zoomOut: "Max",
  });
  const [showER,setER]=useState(true)
  const [count, setCount] = useState(3);
  const Zoom = (event) => {
    if (event === "+") {
      if (count < 5) {
        setCount(count + 1);
      }
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
  };
  useEffect(() => {
    if (count === 3) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    } else if (count === 2) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    }
    if (count === 1) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    } else if (count === 0) {
      setText({ zoomIn: "Min", zoomOut: "Max" });
    }
  }, [count]);
  setTimeout(() => {
    setER(false);
  }, 3000);
  return (
    <div className="erdiagram-container">
      <div className="min-max-container">
        <h3>ER Diagram</h3>
        <div className="min-max-button">
         
          <div className="max-button" onClick={() => Zoom("+")}>
            <img src={zoomin} width="25" height="25" />
          </div>
          <div className="max-button" onClick={() => Zoom("-")}>
            <img src={zoomout} width="25" height="25" />
          </div>
          
        </div>
      </div>
     
      <Mermaid chart={'erDiagram'+getErdVal} zoom={count} />
      
     {
      showER && <div className="er-loading">
      <Loader/> 
      {"Generating Er Diagram ..."}
    </div>
     }
      
    </div>
  );
};
export default ErDiagram;
