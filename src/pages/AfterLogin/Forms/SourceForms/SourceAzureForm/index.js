import React, { useState } from "react";
import "./index.scss";
import Input from "./../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/Button";
const SourceAzureForm = ({
  testConnection,
  previousClick,
  nextClick,
  buttonText,
}) => {
  const databaseType = ["", "Oracle DB", "PostgreSQL", "AWS S3"];
  const [projectSourceData, setProjectSourceData] = useState({
    username: "",
    dns: "",
    password: "",
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    let formData = {
      username: "",
      dns: "",
      password: "",
    };
    if (name === "server") {
      Storage.setItem("server_source_azure", value);
      Storage.setItem("formData", { ...formData, username: value });
    }
    if (name === "username") {
      Storage.setItem("username_source_azure", value);
      Storage.setItem("formData", { ...formData, username: value });
    }
    if (name === "database") {
      Storage.setItem("database_source_azure", value);
      Storage.setItem("formData", { ...formData, username: value });
    }
    if (name === "dns") {
      Storage.setItem("dsn_source_azure", value);
      Storage.setItem("formData", { ...formData, dns: value });
    }
    if (name === "password") {
      Storage.setItem("password_source_azure", value);
      Storage.setItem("formData", { ...formData, password: value });
    }
    console.log("form data:", name, value);
    setProjectSourceData({ ...projectSourceData, [name]: value });
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
    <div className="source-azure-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="source-azure">
          <h2>Source Database: {Storage.getItem("source_database")}</h2>
          <Input
            labelText="Server Name"
            name={"server"}
            onKeyUp={HandlerChange}
            defaultValue={Storage.getItem("server_source_azure")}
            reference={register("server")}
          />
          <Input
            labelText="Server Port"
            name={"server"}
            onKeyUp={HandlerChange}
            defaultValue={Storage.getItem("server_source_azure")}
            reference={register("server")}
          />
          <Input
            labelText="Database Name"
            name={"database"}
            onKeyUp={HandlerChange}
            defaultValue={Storage.getItem("database_source_azure")}
            reference={register("database")}
          />
          <Input
            labelText="User Name"
            name={"username"}
            onKeyUp={HandlerChange}
            defaultValue={Storage.getItem("username_source_azure")}
            reference={register("username")}
          />
          <Input
            type="password"
            labelText="Password"
            name={"password"}
            onKeyUp={HandlerChange}
            defaultValue={Storage.getItem("password_source_azure")}
            reference={register("password")}
          />
        </div>

        <div className="buttons">
          <div className="staper-button-container">
            <Button
              buttonText={buttonText.text}
              background={buttonText.bgColor}
              color="white"
              padding={"6px 20px"}
              clickHandler={nextClick}
            />

            <Button
              buttonText="Previous"
              clickHandler={previousClick}
              padding={"6px 20px"}
            />
            <Button buttonText="Cancel" padding={"6px 20px"} />
          </div>

          <button className="test-connection" buttonText="Test Connection">
            <Button buttonText="Test Connection" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SourceAzureForm;
