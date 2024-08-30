import React, { useState } from "react";
import "./index.scss";
import Input from "../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import Button from "../../../../../components/Button";
import { useForm } from "react-hook-form";
const SourceAdlsForm = ({
  testConnection,
  previousClick,
  nextClick,
  buttonText,
}) => {
  const sourceDB = Storage.getItem("source_database");
  const targetDB = Storage.getItem("target_database");
  const [projectSourceData, setProjectSourceData] = useState({
    storage_account_name: "",
    container_name: "",
    storage_access_key: "",
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    let formData = {
      storage_account_name: "",
      container_name: "",
      storage_access_key: "",
    };
    if (name === "storage_account_name") {
      Storage.setItem("storage_account_name_source_adls", value);
      Storage.setItem("formData", { ...formData, storage_account_name: value });
    }
    if (name === "container_name") {
      Storage.setItem("container_name_source_adls", value);
      Storage.setItem("formData", { ...formData, container_name: value });
    }
    if (name === "storage_access_key") {
      Storage.setItem("storage_access_key_source_adls", value);
      Storage.setItem("formData", { ...formData, storage_access_key: value });
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
    <div className="source-adls-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="source-adls">
          <h2>Source Database: {Storage.getItem("source_database")}</h2>
          <Input labelText="Storage Account Name" name={"storage_account_name"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("storage_account_name_source_adls")} reference={register("storage_account_name")} />
          <Input labelText="Container Name" name={"container_name"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("container_name_source_adls")} reference={register("container_name")} />
          <Input inputType="password" labelText="Storage Access Key" name={"storage_access_key"} onKeyUp={HandlerChange} defaultValue={Storage.getItem("storage_access_key_source_adls")} reference={register("storage_access_key")} />
        </div>
        <div className="buttons">
          <div className="staper-button-container">
            <Button
              buttonText={buttonText.text}
              background={buttonText.bgColor}
              color="white"
              clickHandler={nextClick}
            />

            <Button buttonText="Previous" clickHandler={previousClick} />
          </div>

          <button className="test-connection" buttonText="Test Connection">
            <Button buttonText="Test Connection" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SourceAdlsForm;
