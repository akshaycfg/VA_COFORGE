import React, { useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import Input from "./../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import Button from "../../../../../components/Button";
const TargetPostgresForm = ({ testConnection, previousClick, nextClick, buttonText }) => {
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
    if(name==="username"){
      Storage.setItem("username_target_postgres", value);
      Storage.setItem("formData", {...formData,target_username:value});
    }
    if(name==="host"){
      Storage.setItem("host_target_postgres", value);
      Storage.setItem("formData", {...formData,host:value});
    }
    if(name==="port"){
      Storage.setItem("port_target_postgres", value);
      Storage.setItem("formData", {...formData,port:value});
    }
    if(name==="dbname"){
      console.log("database_type",value)
      Storage.setItem("database_type_target_postgres", value);
      Storage.setItem("formData", {...formData,database_type:value});
    }
    if(name==="password"){
      Storage.setItem("password_target_postgres", value);
      //Storage.setItem("formData", {...formData,password:value});
    }
    


    console.log("form data:", name, value)
    setProjectTargetData({ ...projectTargetData, [name]: value });
    
  };
 
  const onSubmit = (data) => {
    data.database_type = Storage.getItem("target_database");
    testConnection(data)
   }
  return (

    <div className="target-postgres-container">
      {/* <BreadCrumbs breadData={breadData} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="target-postgres">
      <h3>Target Database: {Storage.getItem("target_database")}</h3>
        <Input labelText="User Name"  name={"username"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("username_target_postgres")} reference={register("username")}/>
        <Input labelText="Host" name={"host"}  onKeyUp={HandlerChange} defaultValue={Storage.getItem("host_target_postgres")} reference={register("host")}/>
        <Input labelText="Port" name={"port"}  onKeyUp={HandlerChange} defaultValue={Storage.getItem("port_target_postgres")} reference={register("port")}/>
        <Input
          labelText="Database name"
          onKeyUp ={HandlerChange}
          name="database_type"
          defaultValue={Storage.getItem("database_type_target_postgres")}
          reference={register("dbname")}
        />
        <Input inputType="password" labelText="Password"  onKeyUp={HandlerChange} name={"password"} defaultValue={Storage.getItem("password_target_postgres")}  reference={register("password")}/>
      </div>
      <div className="buttons">
            <div className="staper-button-container">
              <Button
                buttonText={buttonText.text}
                background={buttonText.bgColor}
                color="white"
                clickHandler={nextClick}
              />
            
              <Button  buttonText="Previous" clickHandler={previousClick} />
              
            </div>
          
            <button  className="test-connection" buttonText="Test Connection" ><Button buttonText="Test Connection" /></button>
              
          
          </div>
          </form>
    </div>
  );
};
export default TargetPostgresForm;
