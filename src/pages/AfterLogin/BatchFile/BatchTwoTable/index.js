import "./index.scss";
import InputSelector from "../../../../components/InputSelector";
const BatchTwoTable = ({}) => {
  const userOptionValue = ["user 1", "user 2"];
  let tableHeader = [
    {
      tableName: "Table Name",
      columnno: "Column NO.",
      from: "From",
      to: "To",
      record: "Total No of Record",
      batch: "Recommended Batches",
      user: "User Changes",
    },
  ];
  let tableData = [
    {
      tableName: "table 1",
      columnno: "3",
      from: "10",
      to: "1000",
      record: "500",
      batch: "1",
      user: "",
    },
    {
      tableName: "table 2",
      columnno: "5",
      from: "15",
      to: "1500",
      record: "100000",
      batch: "7",
      user: "",
    },
  ];
  return (
    <div className="tabletwo-container">
      <table className="data-tabletwo">
        {tableHeader.map((item, i) => {
          return (
            <tr>
              <th className="header-class">{item.tableName}</th>
              <th className="header-class">{item.columnno}</th>
              <th className="header-class">{item.from}</th>
              <th className="header-class">{item.to}</th>
              <th className="header-class">{item.record}</th>
              <th className="header-class">{item.batch}</th>
              <th className="header-class">{item.user}</th>
            </tr>
          );
        })}
        {tableData.map((item, i) => {
          return (
            <tr>
              <td>{item.tableName}</td>
              <td>{item.columnno}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{item.record}</td>
              <td>{item.batch}</td>
              <td>
                <InputSelector
                  optionValue={userOptionValue}
                  name="user"
                  selectLabel="user"
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default BatchTwoTable;
