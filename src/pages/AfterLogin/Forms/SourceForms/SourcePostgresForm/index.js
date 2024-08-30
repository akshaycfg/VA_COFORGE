import React, { useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import Input from "./../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import Button from "../../../../../components/Button";
const SourcePostgresForm = ({
  testConnection,
  previousClick,
  nextClick,
  buttonText,
}) => {
  const breadData = [
    { path: "projects", text: "Project " },
    { path: "targets", text: "Target" },
  ];
  const databaseType = ["", "Oracle DB", "PostgreSQL", "AWS S3"];
  const [projectTargetData, setProjectTargetData] = useState({
    target_username: "",
    host: "",
    port: "",
    password: "",
    database_type: "",
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    let formData = {
      target_username: "",
      host: "",
      port: "",
      target_password: "",
      database_type: ""

    }
    if (name === "username") {
      Storage.setItem("username_source_postgres", value);
      Storage.setItem("formData", { ...formData, target_username: value });
    }
    if (name === "host") {
      Storage.setItem("host_source_postgres", value);
      Storage.setItem("formData", { ...formData, host: value });
    }
    if (name === "port") {
      Storage.setItem("port_source_postgres", value);
      Storage.setItem("formData", { ...formData, port: value });
    }
    if (name === "dbname") {
      console.log("database_type", value)
      Storage.setItem("database_type_source_postgres", value);
      Storage.setItem("formData", { ...formData, database_type: value });
    }
    if (name === "password") {
      console.log(value,name)
      Storage.setItem("password_source_postgres", value);
      //Storage.setItem("formData", {...formData,password:value});
    }
    console.log("form data:", name, value);
    setProjectTargetData({ ...projectTargetData, [name]: value });
  };
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    data.database_type = Storage.getItem("source_database");
    testConnection(data);
  };
  return (
    <div className="source-postgres-container">
      {/* <BreadCrumbs breadData={breadData} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="source-postgres">
          <h3>Source Database: {Storage.getItem("source_database")}</h3>
          <Input labelText="User Name *" name={"username"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("username_source_postgres")} reference={register("username")} />
          <Input labelText="Host *" name={"host"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("host_source_postgres")} reference={register("host")} />
          <Input labelText="Port *" name={"port"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("port_source_postgres")} reference={register("port")} />
          <Input
            labelText="Database Name *"
            onKeyUp={HandlerChange}
            name="dbname"
            defaultValue={Storage.getItem("database_type_source_postgres")}
            reference={register("dbname")}
          />
          <Input type="password" labelText="Password *" onKeyUp={HandlerChange} name={"password"} defaultValue={Storage.getItem("password_source_postgres")} reference={register("password")} />
        </div>
        <div className="buttons">
          <div className="staper-button-container">
            <Button
              buttonText={buttonText.text}
              background={buttonText.bgColor}
              color="white"
              clickHandler={nextClick}
            />

            <Button
              className="test-connection"
              buttonText="Previous"
              clickHandler={previousClick}
            />
          </div>

          <button className="test-connection" buttonText="Test Connection">
            <Button buttonText="Test Connection" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default SourcePostgresForm;
