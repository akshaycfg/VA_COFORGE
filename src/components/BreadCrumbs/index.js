import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import "./index.scss";
const BreadCrumbsDiv = styled.div``;

const BreadCrumbs = ({ breadData }) => {
  const CurrentPath = useLocation();
  let breadcrumpath = "";
  let nam = CurrentPath.pathname.split("/").filter((x) => x !== "");
  return (
    <BreadCrumbsDiv className="breadcrum-container">
      {breadData?.map((name) => {
        if (name.path == nam[0]) {
          return <span>/ {name.text}</span>;
        } else if (breadData[0].path == name.path) {
          breadcrumpath += `/${name.path}`;
          return <Link to={breadcrumpath}>{name.text} </Link>;
        } else {
          breadcrumpath += `/${name.path}`;
          return <Link to={breadcrumpath}>/ {name.text} </Link>;
        }
      })}
    </BreadCrumbsDiv>
  );
};

export default BreadCrumbs;
