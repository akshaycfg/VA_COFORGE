import React, { useEffect, useState } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dropdownimg from "../../../images/dropdownimg.png";
import Folder  from "../../../assets/images/Folder.svg";
import SchemaMapingTreeFolder from "../../../components/SchemaMapingTreeFolder";
import "./index.scss";
const SchemaMaping = ({ getTable }) => {
  const [getShowMessage, setShowMessage] = useState(false);
  const testData = [
    {
        name: "Config1",
        checked:true,
        treeView:false,
        children: [
            { name: "Table 1 ",checked:true },
            { name: "Table 2 ",checked:true },
        ],
    }
   , {
    name: "Config2",
    checked:false,
    treeView:false,
    children: [
        { name: "Table 1 ",checked:false  },
        { name: "Table 2 ",checked:true },
        { name: "Table 3 ",checked:false },
    ],
},
{
    name: "Config3",
    checked:false,
    treeView:false,
    children: [
      { name: "Table 1 ",checked:false  },
      { name: "Table 2 ",checked:true },
      { name: "Table 3 ",checked:false },
      { name: "Table 4 ",checked:true },
    ],
  },
  {
    name: "Config4",
    checked:false,
    treeView:false,
    children: [
        { name: "Table 1 ",checked:true  },
        { name: "Table 2 ",checked:false },
        { name: "Table 3 ",checked:false },
    ],
},
  ]
  useEffect(() => {
    const meesageTimeout =
      getTable.length === 0 &&
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    return () => {
      clearTimeout(meesageTimeout);
    };
  }, []);
  return (
    <div className="schema-maping-container">
      <div className="schemamaping">Schema Maping</div>
       <SchemaMapingTreeFolder
        initialData={testData}
        
      />
    </div>
  );
};

export default SchemaMaping;
