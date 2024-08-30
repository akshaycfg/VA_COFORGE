import React, { useState } from "react";
import "./Target.scss";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Input from "../../../components/Input";
import InputSelector from "../../../components/InputSelector";
import Header from "../../../components/Headers";
import SideNav from "../../../components/SideNav";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import Storage from "../../../services/Storage";
const Target = () => {
  const breadData = [
    { path: "projects", text: "Project " },
    { path: "targets", text: "Target" },
  ];
  const databaseType = ["", "Oracle DB", "PostgreSQL", "AWS S3"];
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const [projectTargetData, setProjectTargetData] = useState({
    target_username: "",
    host: "",
    port:"",
    password: "",
    database_type:""
    
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
     let  formData = {
      target_username: "",
      host: "",
      port:"",
      target_password: "",
      database_type:""
      
    }
    if(name==="target_username"){
      Storage.setItem("target_username", value);
      Storage.setItem("formData", {...formData,target_username:value});
    }
    if(name==="host"){
      Storage.setItem("host", value);
      Storage.setItem("formData", {...formData,host:value});
    }
    if(name==="port"){
      Storage.setItem("port", value);
      Storage.setItem("formData", {...formData,port:value});
    }
    if(name==="database_type"){
      console.log("database_type",value)
      Storage.setItem("database_type", value);
      Storage.setItem("formData", {...formData,database_type:value});
    }
    if(name==="target_password"){
      Storage.setItem("target_password", value);
      //Storage.setItem("formData", {...formData,password:value});
    }
    


    console.log("form data:", name, value)
    setProjectTargetData({ ...projectTargetData, [name]: value });
    
  };
  return (

    <div className="target-container">
      {/* <BreadCrumbs breadData={breadData} /> */}
      <div className="target">
      <h3>Target Database: {Storage.getItem("target_database")}</h3>
        <Input labelText="User Name"  name={"target_username"} onChange={HandlerChange} value={Storage.getItem("target_username")} />
        <Input labelText="Host" name={"host"}  onChange={HandlerChange} value={Storage.getItem("host")}/>
        <Input labelText="Port" name={"port"}  onChange={HandlerChange} value={Storage.getItem("port")}/>
        <Input
          labelText="Database Type"
          onChange={HandlerChange}
          name="database_type"
          value={Storage.getItem("database_type")}
        />
        <Input inputType="password" labelText="Password"  onChange={HandlerChange} name={"target_password"}value={Storage.getItem("target_password")}/>
      </div>
    </div>
  );
};
export default Target;
