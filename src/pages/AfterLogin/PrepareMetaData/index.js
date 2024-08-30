import FolderTree, { testData } from "react-folder-tree";
import { FaBitcoin, FaEthereum, FaFolder } from "react-icons/fa";
import "./index.scss";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Storage from "../../../services/Storage";
import TreeFolder from "../../../components/TreeFolder";
import { listMetaDataAsync } from "../../../lib/stepper";
import { useDispatch, useSelector } from "react-redux";
const CustomIcon = ({ onClick }) => {
  return (
    // <svg
    //   width="36"
    //   onClick={() => onClick()}
    //   height="36"
    //   viewBox="0 0 36 36"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M12 11C9.5 11 7.375 10.6083 5.625 9.825C3.875 9.04167 3 8.1 3 7C3 5.9 3.875 4.95833 5.625 4.175C7.375 3.39167 9.5 3 12 3C14.5 3 16.625 3.39167 18.375 4.175C20.125 4.95833 21 5.9 21 7C21 8.1 20.125 9.04167 18.375 9.825C16.625 10.6083 14.5 11 12 11ZM12 16C9.5 16 7.375 15.6083 5.625 14.825C3.875 14.0417 3 13.1 3 12V9.5C3 10.2333 3.34167 10.8543 4.025 11.363C4.70833 11.871 5.525 12.2833 6.475 12.6C7.425 12.9167 8.41267 13.1457 9.438 13.287C10.4627 13.429 11.3167 13.5 12 13.5C12.6833 13.5 13.5373 13.429 14.562 13.287C15.5873 13.1457 16.575 12.9167 17.525 12.6C18.475 12.2833 19.2917 11.871 19.975 11.363C20.6583 10.8543 21 10.2333 21 9.5V12C21 13.1 20.125 14.0417 18.375 14.825C16.625 15.6083 14.5 16 12 16ZM12 21C9.5 21 7.375 20.6083 5.625 19.825C3.875 19.0417 3 18.1 3 17V14.5C3 15.2333 3.34167 15.8543 4.025 16.363C4.70833 16.871 5.525 17.2833 6.475 17.6C7.425 17.9167 8.41267 18.146 9.438 18.288C10.4627 18.4293 11.3167 18.5 12 18.5C12.6833 18.5 13.5373 18.4293 14.562 18.288C15.5873 18.146 16.575 17.9167 17.525 17.6C18.475 17.2833 19.2917 16.871 19.975 16.363C20.6583 15.8543 21 15.2333 21 14.5V17C21 18.1 20.125 19.0417 18.375 19.825C16.625 20.6083 14.5 21 12 21Z"
    //     fill="black"
    //   />
    // </svg>
    <svg width="36" onClick={() => onClick()} height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.7863 9.41283H18.3622L13.6493 4.9048C13.5893 4.84866 13.5104 4.81711 13.4283 4.81641H3.21491C2.50375 4.81641 1.9292 5.39096 1.9292 6.10212V29.8878C1.9292 30.599 2.50375 31.1735 3.21491 31.1735H32.7863C33.4975 31.1735 34.0721 30.599 34.0721 29.8878V10.6985C34.0721 9.98739 33.4975 9.41283 32.7863 9.41283ZM31.1792 28.2807H4.82206V7.70926H12.3957L17.2011 12.3057H31.1792V28.2807Z" fill="#ff7a45" fill-opacity="0.85"/>
</svg>
  );
};
const FileIcon = ({ onClick: defaultOnClick, nodeData }) => {
  const { path, name, checked, isOpen, url, ...restData } = nodeData;
  const handleClick = () => {
    console.log("icon clicked:", { path, name, url, ...restData });
    defaultOnClick();
  };

  return <CustomIcon onClick={handleClick} />;
};

const FolderIcon = ({ onClick: defaultOnClick, nodeData }) => {
  const { path, name, checked, isOpen, url, ...restData } = nodeData;
  const handleClick = () => {
    console.log("icon clicked:", { path, name, url, ...restData });
    defaultOnClick();
  };

  return <CustomIcon onClick={handleClick} />;
};

const FolderOpenIcon = ({ onClick: defaultOnClick, nodeData }) => {
  const { path, name, checked, isOpen, url, ...restData } = nodeData;
  const handleClick = () => {
    console.log("icon clicked:", { path, name, url, ...restData });
    defaultOnClick();
  };

  return <CustomIcon onClick={handleClick} />;
};
const iconComponents = {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
};
const testDataing = () => {
  console.log("hi");
};

const PrepareMetaData = () => {
  const pathArray = window.location.pathname.split("/");
  let fileName = pathArray[2];
  let dispatch = useDispatch();
  const [getMetadata, setMetadata] = useState();
  const [schemaData, setSchemaData] = useState([]);
  const testData = [{
    name: "Config1",
    children:[
      {
        name: "Config1",
        checked: false,
        treeView: false,
        children: [
          { name: "Table 1 " },
          { name: "Table 2 " },
        ],
      },
      {
        name: "Config2",
        checked: false,
        treeView: false,
        children: [
          { name: "Table 1 ", checked: false },
          { name: "Table 2 ", checked: false },
          { name: "Table 3 ", checked: false },
        ],
      },
      {
        name: "Config3",
        checked: false,
        treeView: false,
        children: [
          { name: "Table 1 ", checked: false },
          { name: "Table 2 ", checked: false },
          { name: "Table 3 ", checked: false },
          { name: "Table 4 ", checked: false },
        ],
      },
    ]
  
}]
  

  const [dataGet, dataSet] = useState([]);

  const tryRequire = () => {
    try {
      return require(`/src/backend_data/${fileName}${".json"}`);
    } catch (err) {
      return testData;
    }
  };
  const onTreeStateChange = (state) => {
    let dataReq = {};
    let selectData = [];
    if (state.children.length !== 0) {
      let ds = state.children;

      let result = ds.filter((word) => word.checked === 1);
      for (let x of result) {
        selectData.push(x.name);
      }

      dataReq.project_name = state.name;
      dataReq.schema_slct = selectData;
      setMetadata(dataReq);
      console.log(dataReq, "dataReq");
      Storage.setItem("dataReq", dataReq);
    }

    Storage.setItem("dataset", state);
    console.log("tree state: ", state);
  };
  const getData = (data) => {
    console.log("data updated", data);
  };
  const prepareMetaDataResponse = useSelector(
    (state) => state.steppertReducer.prepareMetaDataResponse
  );
  // useEffect(() => {
  //   dispatch(listMetaDataAsync({ project_name: "PG_to_S3_metadata_businessfile" }));
  // }, []);
  // useEffect(() => {
  //   console.log("prepareMetaDataResponse", prepareMetaDataResponse);
  // }, [prepareMetaDataResponse]);
  return (
    <div className="createschemaTree">
      <div className="choose-schema">Prepare Meta Data</div>
      <div className="folder-tree-container">
       <FolderTree data={tryRequire()}  showCheckbox={ false } onChange={(state)=>onTreeStateChange(state)} iconComponents={iconComponents}  /> 
      </div>
      
      
      {/* <TreeFolder
        initialData={[tryRequire()]}
        CustomIcon={CustomIcon}
        inputCheckbox={true}
        getData={(data) => getData(data)}
      /> */}
    </div>
  );
};

export default PrepareMetaData;
