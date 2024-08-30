import React, { useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import Input from "./../../../../../components/Input";
import Storage from "../../../../../services/Storage";
import Button from "../../../../../components/Button";
const TargetAwsS3Form = ({
  testConnection,
  previousClick,
  nextClick,
  buttonText,
}) => {
  const breadData = [
    { path: "projects", text: "Project " },
    { path: "targets", text: "Target" },
  ];
  const [projectTargetData, setProjectTargetData] = useState({
    aws_access_key_id: "",
    aws_secret_access_key: "",
  });
  const HandlerChange = (e) => {
    const { name, value } = e.target;
    let formData = {
      aws_access_key_id: "",
      aws_secret_access_key: "",
    };
    if (name === "aws_access_key_id") {
      Storage.setItem("aws_access_key_id", value);
      Storage.setItem("formData", { ...formData, aws_access_id: value });
    }
    if (name === "aws_secret_access_key") {
      Storage.setItem("aws_secret_access_key", value);
      Storage.setItem("formData", { ...formData, aws_access_key: value });
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
    <div className="awss3-container">
      {/* <BreadCrumbs breadData={breadData} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="target-awss3">
          <h3>Target Database: AWS S3</h3>
          <Input
            labelText="aws_access_key_id"
            name={"aws_access_key_id"}
            onKeyUp={HandlerChange}
            reference={register("aws_access_key_id")}
          />
          <Input
            labelText="aws_secret_access_key"
            name={"aws_secret_access_key"}
            onKeyUp={HandlerChange}
            reference={register("aws_secret_access_key")}
          />
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
export default TargetAwsS3Form;
