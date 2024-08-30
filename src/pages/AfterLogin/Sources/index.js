import React, { useState } from "react";
import "./index.scss";
import InputSelector from "../../../components/InputSelector";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Storage from "../../../services/Storage";
const Sources = () => {
  const databaseType = ["", "Oracle DB", "PostgreSQL", "AWS S3"];
  const [projectSourceData, setProjectSourceData] = useState({
    username: "",
    dns: "",
    password: "",
    
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
     let  formData = {
      username: "",
      dns: "",
      password: "",
      
    }
    if(name==="username"){
      Storage.setItem("username", value);
      Storage.setItem("formData", {...formData,username:value});
    }
    if(name==="dns"){
      Storage.setItem("dns", value);
      Storage.setItem("formData", {...formData,dns:value});
    }
    if(name==="password"){
      Storage.setItem("password", value);
      Storage.setItem("formData", {...formData,password:value});
    }
    console.log("form data:", name, value)
    setProjectSourceData({ ...projectSourceData, [name]: value });
    
  };
  return (
    <div className="source-container">
      <h2>Source Database: {Storage.getItem("source_database")}</h2>
      <div>
        <Input labelText="User Name"  name={"username"} onChange={HandlerChange} value={Storage.getItem("username")} />
        <Input labelText="DSN"  name={"dns"} onChange={HandlerChange}  value={Storage.getItem("dns")} />
        <Input inputType="password" labelText="Password" name={"password"} onChange={HandlerChange} value={Storage.getItem("password")}/>
      </div>
    </div>
  );
};

export default Sources;
