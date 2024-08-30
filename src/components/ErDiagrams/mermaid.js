import React, { useEffect } from "react";
import mermaid from "mermaid";
import styled from "styled-components";
import "./index.scss";
const ErDigramContainer = styled.div`
  font-size: 14px;
`;

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
  fontFamily: "Fira Code",
});

const Mermaid = ({ zoom, chart }) => {
  useEffect(() => {
    setTimeout(() => {
      mermaid.contentLoaded();
    }, 2000);
    // mermaid.contentLoaded();
  }, [chart]);
  return (
    <ErDigramContainer
      className={`${
        zoom === 3
          ? "zoom3"
          : zoom === 2
          ? "zoom2"
          : zoom === 1
          ? "zoom1"
          : zoom === 4
          ? "zoom4"
          : zoom === 5
          ? "zoom5"
          : "zoom0"
      } mermaid`}
    >
      {chart}
    </ErDigramContainer>
  );
};

export default Mermaid;
