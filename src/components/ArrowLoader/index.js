import React from "react";
import loader from "../../images/ArrowLoader.svg";

import "./index.scss";

 const ArrowLoader = ({}) => {
  return (
    <>
      <img src={loader} width="20" height="20" className="rotate loader-arrow" />
    </>
  );
};

export default ArrowLoader;
