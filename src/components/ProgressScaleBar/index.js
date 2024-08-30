import React, { useEffect } from "react";
import styled from "styled-components";

const ScalingDiv = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  background-color: ${(props) => (props.background ? props.background : "")};
  transition: background-color 2000ms linear;

  height: 10px;
`;

const ProgressScaleBar = ({ scale, status, Text }) => {
  useEffect(() => {
    progressScalingBackground(status);
  }, [status]);
  const progressScalingBackground = (value) => {
    let backgroundColor = "";
    if (value == "PENDING") {
      backgroundColor = "#1890FF";
    } else if (value == "RUNNING") {
      backgroundColor = "#ff7a45";
    } else if (value == "SUCCESS") {
      backgroundColor = "#52C41A";
    } else if (value == "FAILED") {
      backgroundColor = "red";
    } else if (value == "CANCELED") {
      backgroundColor = "red";
    } else if (value == "INTERNAL_ERROR") {
      backgroundColor = "red";
    } else if (value == "SKIPPED") {
      backgroundColor = "#FFFF00";
    } else if (value == "TIMEDOUT") {
      backgroundColor = "red";
    } else if (value == "Not Migrated") {
      backgroundColor = "grey";
    } else if (value == "QUEUED") {
      backgroundColor = "blue";
    }
    return backgroundColor;
  };

  return (
    <ScalingDiv
      className="progressrr"
      background={progressScalingBackground(status)}
      width={`${scale}%`}
    ></ScalingDiv>
  );
};

export default ProgressScaleBar;
