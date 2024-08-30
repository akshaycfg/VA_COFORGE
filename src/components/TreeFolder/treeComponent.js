import "./treeComponent.scss";
const TreeComponent = ({ data,folder,checkHandler,configIndex}) => {
 
  return (
    <div className="treecomponent">
          {data.children?.map((item, index) => {
            return (
              <div className="treecomponent-items">
                 <input
                  type="checkbox"
                  name={item.name}
                  value={item.name}
                  checked={item.checked}
                  onChange={(e) => checkHandler(e,index, configIndex, "table-checkbox")}
                />
                <img src={folder} width="20" height="20"/>
                <label>{item.name} </label>
              </div>
            );
          })}
    </div>
  );
};

export default TreeComponent;
