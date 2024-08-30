import React from "react";
import crosscheck from "../../images/crossRedmark.svg";

import "./index.scss";

 const CheckMarkFailed = ({}) => {
  return (
    <>
      <img src={crosscheck} width="20" height="20" className="cross-check-mark"/>
    </>
  );
};

export default CheckMarkFailed;
