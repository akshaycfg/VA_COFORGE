import React, { useEffect, useState } from "react";
import "./index.scss";
import SubMenuButton from "../SubMenuButton";
import { Link, NavLink } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";
import Logout from "../../assets/images/Logout.svg";
import Bar from "../../assets/images/Bars.svg";
import Control from "../../assets/images/Control.svg";
import Database from "../../assets/images/Database.svg";
import Question from "../../assets/images/Question.svg";
import User from "../../assets/images/User.svg";
import Storage from "../../services/Storage";
const Data = [
  {
    name: "Projects",
    image: Dashboard,
    path: "projects",
    backGround:true
  },
  // {
  //   name: "Sources",
  //   image: Database,
  //   path: "sources",
  // },
  // {
  //   name: "Targets",
  //   image: User,
  //   path: "targets",
  // },
  {
    name: "Reports & Dashboards",
    image: Control,
    path: "projectreport",
    backGround:false
  },
  {
    name: "Administration",
    image: Bar,
    path: "",
    backGround:false
  },
  {
    name: "Help",
    image: Question,
    path: "",
    backGround:false
  },
];

const SideNav = () => {
  const useData = Storage.getItem("user");
  const [getInfo, setInfo] = useState("admin");
  const [open, setOpen] = React.useState(false);
  const [navData,setNavData]=useState(Data)
  useEffect(() => {
    if (JSON.parse(useData)) {
      setInfo(JSON.parse(useData).username);
    }
  }, [getInfo]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const logout = () => {
    Storage.removeItem("user");
    window.location.reload();
  };
  const clickHandler=(index)=>{
  var data=navData
  console.log("data1",data)
  for(var i = 0;i < data.length; i++){
    console.log(i)
    if(i===index){
      data[index]={... data[index],backGround:true}
    }else{
      
      if(i===0){
        data[i]={name: "Projects",image: Dashboard,path: "projects",backGround:false}
      }else{
        data[i]={... data[i],backGround:false}
      }
    }
  }
  
  console.log("data2",data)
  setNavData([...data])
   
  }
  useEffect(()=>{

  },[navData])
  return (
    <>
      <div className="side-nav">
        {navData.map((i, index) => {
          return (
            <div  onClick={()=>clickHandler(index)} className="nav-menu-wraper">
            <NavLink to={`/${i.path}`} className={`${i.backGround ? "backgroundActive":" "} link nav-button-container`}>
              <div className="nav-button-div" >
                <SubMenuButton
                  key={index}
                  name={i.name}
                  image={i.image}
                  path={i.path}
                  background={i.backGround}
                ></SubMenuButton>
              </div>
            </NavLink>
            </div>
          );
        })}
        {/* <NavLink className="logout-link nav-button-container"  > */}
        <div
          className="logout-div logout-link nav-button-container"
          onClick={() => logout()}
        >
          <img height="15px" width="15px" src={Logout} alt="o" />
          <span>Logout</span>
        </div>
        {/* </NavLink> */}
      </div>
    </>
  );
};

export default SideNav;
