import "./index.scss";
import { useEffect, useState } from "react";
import dropdownimg from "../../images/dropdownimg.png";
import TreeItem from "./treeItem";
import Folder  from "../../assets/images/Folder.svg";
const SchemaMapingTreeFolder = ({ initialData}) => {
  const [selectedBox, setSelectedBox] = useState([]);
  useEffect(() => {
    console.log(initialData,"initialData")
    setSelectedBox(initialData);
  }, [initialData]);
  const handleTreeview = (index) => {
    var data=selectedBox;
        data[index]={name:data[index].name,checked:data[index].checked,treeView:!data[index].treeView,children:data[index].children}
     setSelectedBox([...data])
  };
    useEffect(() => { 
     
    }, [selectedBox]);
  return (
    <div className="schemaTree">
      {
        selectedBox.map((item,index)=>{
            let unselectTable = item.children.filter((item) => item.checked === true);  
          return (
            <div>
                 {
                   unselectTable.length !== 0  ? <div>
              
                    <div className="treeview-container"> 
                {item.treeView ? (
                  <img
                    src={dropdownimg}
                    width="15"
                    height="20"
                    onClick={()=>handleTreeview(index)}
                    className="imgdropdownww-class"
                  />
                ) : (
                  <img
                    src={dropdownimg}
                    width="15"
                    height="20"
                    onClick={()=>handleTreeview(index)}
                    className="imgcoleps-class"
                  />
                )}
        
                <img src={Folder} width="20" height="20"/>
                <label for="vehicle1">{item.name}</label>
              </div>
              {
               item.treeView &&  <TreeItem data={item} folder={Folder}/>
              }
             
              </div>:""
                }
            
      </div>
          )
        })
      }
    </div>
  );
};

export default SchemaMapingTreeFolder;
