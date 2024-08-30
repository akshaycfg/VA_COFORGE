import React from "react";
import "./index.scss";

const SubMenuButton = ({ name, image,background }) => {
  return (
    <div className="nav-button">
      <img height="15px" width="15px" src={image} alt="o" />
      <span className="">{name}</span>
    </div>
  );
};

export default SubMenuButton;
