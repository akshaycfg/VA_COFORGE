import React from "react";
import BreadCrumbs from "./../../../components/BreadCrumbs";
import ProcessStep from "../../ProcessStep";
import "./CreateProject.scss";

const CreateProject = () => {
  const breadData = [
    { path: "projects", text: "Project " },
    { path: "createproject", text: "Create Project" },
  ];
  return (
    <div className="create-project-container">
      <BreadCrumbs breadData={breadData} />
      <div className="create-project">
        <h3>Create Projects</h3>
        <ProcessStep />
      </div>
    </div>
  );
};
export default CreateProject;
