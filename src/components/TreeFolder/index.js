import "./index.scss";
import { useEffect, useState } from "react";
import dropdownimg from "../../images/dropdownimg.png";
import TreeComponent from "./treeComponent";
import Folder  from "../../assets/images/Folder.svg";
const TreeFolder = ({ initialData,getData}) => {
  const [selectedBox, setSelectedBox] = useState([]);
  useEffect(() => {
    console.log(initialData,"initialData")
    setSelectedBox(initialData);
  }, [initialData]);
  const handleTreeview = (index) => {
    console.log("hhihi")
    var data=selectedBox;
        data[index]={name:data[index].name,checked:data[index].checked,treeView:!data[index].treeView,children:data[index].children}
     setSelectedBox([...data])
  };
  const handleOnChange = (e,index, position) => {
   if(position=== "Project-checkbox"){
    var data=selectedBox;
    var item= data[index].children
      for(var i= 0; i< item.length; i++){
      item[i]={name:item[i].name,checked:e.target.checked}
     }
     data[index]={name:data[index].name,checked:e.target.checked,treeView:data[index].treeView,children:[...item]}
     setSelectedBox([...data])
   }
  };
    useEffect(() => { 
     
    }, [selectedBox]);
    const tableCheckHandler=(e,index, configIndex, text)=>{
      var data=selectedBox;
      var item= data[configIndex].children
      item[index] ={name:item[index].name,checked:e.target.checked}
      data[configIndex]={...data[configIndex],children:[...item]}
      let unselectTable = item.filter((item) => item.checked === false);
      if (unselectTable.length === 0) {
        data[configIndex]={...data[configIndex],checked:true}
      } else {
      data[configIndex]={...data[configIndex],checked:false}
      }
   setSelectedBox([...data])
    }
  return (
    <div className="schemaTree">
      {
        selectedBox.map((item,index)=>{
          return (
            <div>
            <div className="treeview-container">
                <input
                type="checkbox"
                name={item.name}
                value={item.name}
                checked={item.checked}
                onChange={(e) => handleOnChange(e,index, "Project-checkbox")}
              />
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
       item.treeView &&  <TreeComponent data={item} folder={Folder} checkHandler={(e,index, configIndex, text)=>tableCheckHandler(e,index, configIndex, text)} configIndex={index}/>
      }
     
      </div>
          )
        })
      }
    </div>
  );
};

export default TreeFolder;
