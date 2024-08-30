import React from "react";
import check from "../../images/rightTick.svg";

import "./index.scss";

 const CheckMark = ({}) => {
  return (
    <>
      <img src={check} width="30" height="30" className="check-mark"/>
    </>
  );
};

export default CheckMark;
