import React, { useEffect, useState } from "react";
import "./index.scss";
import Input from "./../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import Button from "../../../../../components/Button";
import { useForm } from "react-hook-form";
const SourceOracleForm = ({ testConnection, previousClick, nextClick, buttonText }) => {
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

    }
    if (name === "username") {
      Storage.setItem("username_source_oracle", value);
      Storage.setItem("formData", { ...formData, username: value });
    }
    if (name === "dsn") {
      Storage.setItem("dsn_source_oracle", value);
      Storage.setItem("formData", { ...formData, dns: value });
    }
    if (name === "password") {
      Storage.setItem("password_source_oracle", value);
      Storage.setItem("formData", { ...formData, password: value });
    }
    console.log("form data:", name, value)
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
    testConnection(data)
  }
  return (
    <div className="source-oracle-container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="oracle-form">
        <h2>Source Database: {Storage.getItem("source_database")}</h2>
          <Input labelText="User Name" name={"username"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("username_source_oracle")} reference={register("username", {
            required: false,

          })} />
          <Input labelText="DSN" name={"dsn"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("dsn_source_oracle")} reference={register("dsn")} />
          <Input inputType="password" labelText="Password" name={"password"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("password_source_oracle")} reference={register("password")} />
        </div>
        <div className="buttons-oracle">
          <div className="staper-button-container">
            <Button
              buttonText={buttonText.text}
              background={buttonText.bgColor}
              color="white"
              clickHandler={nextClick}
            />
            <Button buttonText="Previous" clickHandler={previousClick} />

          </div>
          <button className="test-connection" buttonText="Test Connection" ><Button buttonText="Test Connection" /></button>
        </div>
      </form>
    </div>

  );
};

export default SourceOracleForm;
