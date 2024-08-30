import "./index.scss";
const BatchMigrationTable = ({}) => {
  let tableHeader = [{ name: "Column Name" }];
  let tableData = [
    { name: "Batch 1" },
    { name: "Batch 2" },
    { name: "Batch 3" },
    { name: "Batch 4" },
    { name: "Batch 5" },
    { name: "Batch 6" },
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

export default BatchMigrationTable;
