import React, { useEffect, useState } from "react";
import "./index.scss";
import Input from "./../../../components/Input";
import InputSelector from "../../../components/InputSelector";
import TextArea from "./../../../components/Textarea";
import { useForm } from "react-hook-form";
import Storage from "../../../services/Storage";
import Button from "../../../components/Button";
import Multiselect from "multiselect-react-dropdown";
import { listConfigsAsync } from "../../../lib/projects";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
const ProjectForm = ({ buttonText, nextClick, setDatabaseType }) => {
  const [isConfigFile, setConfig] = useState(false);
  const [getConfigDatabase, setConfigDatabase] = useState([]);
  const [getselectConfigData, selectConfigData] = useState([]);
  const [projectFormData, setProjectFormData] = useState({
    project_name: "",
    description: "",
    source_database: "",
    target_database: "",
  });
  const databaseType = [
    { name: "Config File1", id: 1 },
    { name: "Config File2", id: 2 },
    { name: "Config File3", id: 3 },
    { name: "Config File4", id: 4 },
  ];
  const sourceData = ["PostgreSQL", "AWS S3"];
  // const handleInput = (e, key) => {
  //   setProjectFormData({
  //     ...projectFormData,
  //     [key]: e.target.value,
  //   });
  //   console.log("form data:eee", projectFormData)
  // };
  let dispatch = useDispatch();
  const listConfigsResponse = useSelector(
    (state) => state.projectsList.listConfigsResponse
  );
  useEffect(() => {
    dispatch(listConfigsAsync());
  }, []);
  useEffect(() => {
    if (
      listConfigsResponse !== undefined &&
      Object.keys(listConfigsResponse).length > 0
    ) {
      if (listConfigsResponse.status === 200) {
        var obj = [];
        var pop = listConfigsResponse.data.filter(
          (xs) => xs !== "__init__.py" && xs !== "__pycache__"
        );
        console.log(pop);
        for (let x in pop) {
          obj.push({
            name: listConfigsResponse.data[x],
            id: x,
          });
        }

        setConfigDatabase(obj);
        console.log(listConfigsResponse, "test");
      } else {
        setConfigDatabase([]);
        console.log(listConfigsResponse, "test1`");
      }
      // dispatch(resetProjectActionAsync());
    }
  }, [listConfigsResponse]);

  const HandlerChange = (e, key) => {
    setProjectFormData({
      ...projectFormData,

      [key]: e.target.value,
    });
    const { name, value } = e.target;

    if (value === "configFiles") {
      setConfig(true);
      Storage.setItem("metadata_source", "business_files");
    } else if (value === "sourceDB") {
      Storage.setItem("metadata_source", "source_db");
      setConfig(false);
    }

    let formData = {
      project_name: "",
      description: "",
      source_database: "",
      target_database: "",
    };
    Storage.setItem("formData", formData);

    if (name === "source_database") {
      setDatabaseType({ databaseType: value });
      Storage.setItem("source_database", value);

      Storage.setItem("formData", {
        ...Storage.getItem("formData"),
        source_database: value,
      });
    }
    if (name === "target_database") {
      Storage.setItem("target_database", value);
      Storage.setItem("formData", {
        ...Storage.getItem("formData"),
        target_database: value,
      });
    }
    if (name === "project_name") {
      console.log(value, "valuevaluevalue");
      Storage.setItem("project_name", value);
      Storage.setItem("formData", {
        ...Storage.getItem("formData"),
        project_name: value,
      });

      setProjectFormData({
        ...projectFormData,
        project_name: Storage.getItem("project_name"),
      });
    }
    if (name === "description") {
      Storage.setItem("description", value);
      Storage.setItem("formData", {
        ...Storage.getItem("formData"),
        description: value,
      });

      setProjectFormData({
        ...projectFormData,
        project_name: Storage.getItem("description"),
      });
    }

    Storage.getItem("project_name");
    console.log("form data:", name, value);
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
    console.log("data:", data);
    // let postData = JSON.stringify({
    //   username: data.username,
    //   password: data.password,

    // });
  };
  useEffect(() => {
    console.log(projectFormData);
    // setProjectFormData({
    // project_name:Storage.getItem('project_name')
    // })
  }, []);
  const ar = [];
  const selectConfigFile = (list, list1) => {
    ar.push(list1.name);
    console.log("selectfile", list, list1, ar);
    selectConfigData(list);
    Storage.setItem("configfile", JSON.stringify(list));
  };
  const removeConfigFile = (list, list1) => {
    ar.push(list1.name);
    console.log("removefile", list, list1, ar);
    selectConfigData(list);
    Storage.setItem("configfile", JSON.stringify(list));
  };

  return (
    <div className="create-project-container">
      <div className="create-project">
        <Input
          inputType="text"
          placeholder="Enter"
          name="project_name"
          labelText="Project Name *"
          onKeyUp={HandlerChange}
          defaultValue={Storage.getItem("project_name")}
          reference={register("project_name")}
        />
        <TextArea
          inputType="text"
          name="description"
          labelText="Description *"
          onChange={HandlerChange}
          defaultValue={Storage.getItem("description")}
          reference={register("description")}
        />
        <InputSelector
          labelText="Select Source Database Type *"
          optionValue={sourceData}
          onChange={HandlerChange}
          name="source_database"
          selectLabel={Storage.getItem("source_database")}
        />
        <div className="meta-data-source">
          <div>Meta Data Source:</div>
          <div className="metatdata">
            <Input
              type="radio"
              name="metadata"
              onChange={HandlerChange}
              value={"sourceDB"}
            />
            <label>SourceDB</label>
          </div>
          <div className="metatdata">
            <Input
              type="radio"
              name="metadata"
              onChange={HandlerChange}
              value={"configFiles"}
            />
            <label>Business File</label>
          </div>
        </div>
        {isConfigFile && (
          <div>
            <label>Config Files</label>
            <Multiselect
              options={getConfigDatabase} // Options to display in the dropdown
              onSelect={selectConfigFile} // Function will trigger on select event
              onRemove={removeConfigFile}
              showCheckbox={true}
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
        )}

        {/* <InputSelector
          labelText="Target Database Type"
          optionValue={targetData}
          onChange={HandlerChange}
          name="target_database"
          value={Storage.getItem("target_database")}
          
        />  */}
      </div>
      <div className="buttons">
        <div className="staper-button-container">
          <Button
            buttonText={"Cancel"}
            background={"white"}
            color="black"
            padding={"6px 20px"}
          />
          <Button
            buttonText={buttonText.text}
            background={buttonText.bgColor}
            color="white"
            clickHandler={nextClick}
            padding={"6px 20px"}
          />
        </div>
      </div>
    </div>
  );
};
export default ProjectForm;
