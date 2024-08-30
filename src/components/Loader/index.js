import React from "react";
import styled from "styled-components";
import loading from "./../../images/loading-gif.gif";

const Loadercomponent = styled.div`
  display: flex;
  position: absolute;

  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Loader = () => {
  return (
    <>
      <Loadercomponent className="loader-component">
        <img src={loading} width="50" height="50" />
      </Loadercomponent>
    </>
  );
};

export default Loader;
