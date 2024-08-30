import "./index.scss";
const BatchOneTable = ({}) => {
  let tableHeader = [{ name: "Column Name" }];
  let tableData = [
    { name: "Column 1" },
    { name: "Column 2" },
    { name: "Column 3" },
    { name: "Column 4" },
    { name: "Column 5" },
    { name: "Column 6" },
  ];
  return (
    <div className="tableone-container">
      <table className="data-tableOne">
        {tableHeader.map((item, i) => {
          return (
            <tr>
              <th className="header-class">{item.name}</th>
            </tr>
          );
        })}
        {tableData.map((item, i) => {
          return (
            <tr>
              <td>
                <div className="table-contents">
                  <span>
                    <input type="checkbox" />
                  </span>
                  <span> {item.name}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default BatchOneTable;
