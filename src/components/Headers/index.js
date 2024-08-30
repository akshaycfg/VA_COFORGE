import React, { useEffect, useState } from "react";
import "./index.scss";
import MigxLogo from "../../assets/images/MigXpressDeveloper.png";
import Avatar from "../../assets/images/Avatar.png";
import Icon1 from "../../assets/images/Icon-Wrapper.png";
import Icon2 from "../../assets/images/Icon-Wrapper1.png";
import Logo from "../../assets/images/Coforge-logo-Coral-White.svg";
import Storage from "../../services/Storage";

const Header = () => {
  const useData = Storage.getItem("user");
  const [getInfo, setInfo] = useState("admin");
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (JSON.parse(useData)) {
      setInfo(JSON.parse(useData).username);
    }
  }, [getInfo]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const logout=()=>{
    Storage.removeItem("user");
    window.location.reload();
  }
  return (
    <div className="headercontainer">
      <div className="header">
        <div className="header">
          <img src={Logo} alt="logo" height="78px" />
          <p id="headerText">
            <span id="mig">MIGX</span>
            <span id="press">press</span>{" "}
            <span id="development">Developer</span>
          </p>
        </div>
        <div className="user-profile-div">
          <img src={Icon2} alt="logo" />
          <img src={Icon1} alt="logo" />
          <div className="user-profile-div">
            <img src={Avatar} alt="logo" onClick={() => handleOpen()} />
            <span>{getInfo}</span>
            {open ? (
              <ul className="menu">
                <li className="menu-item">
                  <button
                    onClick={() =>logout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
