import "./treeItem.scss";
import dropdownimg from "../../images/dropdownimg.png";
const TreeItem = ({ data, folder }) => {
  return (
    <div className="treecomponent">
      {data.children?.map((item, index) => {
        return (
          <div>
            {item.checked ? (
              <div className="treecomponent-items">
                <img src={folder} width="20" height="20" />
                <label>{item.name} </label>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TreeItem;
