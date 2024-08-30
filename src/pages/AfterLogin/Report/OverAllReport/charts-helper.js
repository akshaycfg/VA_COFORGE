import { ceil } from "lodash";

// const data = {
//   "migration_data": {
//     "DEMODB": {
//       "EMPLOYEES": "UNSUCCESS",
//       "HIM_MARKS10": "SUCCESS",
//       "IMAGE": "SUCCESS",
//       "MAS_CON_2": "SUCCESS",
//       "MAS_CON_3": "SUCCESS",
//       "MAS_CON_5": "SUCCESS",
//       "MEMBERS": "SUCCESS",
//       "ORDERS": "SUCCESS",
//       "PAYMENTS": "SUCCESS",
//       "TEST_MAS_EMP": "SUCCESS"
//     },
//     "TESTDB": {
//       "CHECKDEFAULT": "SUCCESS",
//       "CHECKDUPLICATE": "SUCCESS",
//       "CHECKKEYWORDS": "SUCCESS",
//       "CHECKPKKEYCOL": "SUCCESS",
//       "CHECKSAMENAME": "SUCCESS",
//       "INVENTORIES": "SUCCESS",
//       "MARKS": "SUCCESS",
//       "TEST_MAS_DATE": "SUCCESS",
//       "TEST_MAS_EMP": "SUCCESS"
//     }
//   },
//   "reconciliation_data": {
//     "DEMODB": {
//       "EMPLOYEES": {
//         "source_count": 10,
//         "staging_count": 10,
//         "target_count": 10
//       },
//       "HIM_MARKS10": {
//         "source_count": 10000,
//         "staging_count": 10000,
//         "target_count": 10000
//       },
//       "IMAGE": {
//         "source_count": 2,
//         "staging_count": "error",
//         "target_count": "error"
//       },
//       "MAS_CON_2": {
//         "source_count": 10000,
//         "staging_count": 10000,
//         "target_count": 10000
//       },
//       "MAS_CON_3": {
//         "source_count": 10000,
//         "staging_count": 10000,
//         "target_count": 10000
//       },
//       "MAS_CON_5": {
//         "source_count": 10000,
//         "staging_count": 10000,
//         "target_count": 10000
//       },
//       "MEMBERS": {
//         "source_count": 0,
//         "staging_count": 0,
//         "target_count": 0
//       },
//       "ORDERS": {
//         "source_count": 0,
//         "staging_count": 0,
//         "target_count": 0
//       },
//       "PAYMENTS": {
//         "source_count": 0,
//         "staging_count": 0,
//         "target_count": 0
//       },
//       "TEST_MAS_EMP": {
//         "source_count": 100,
//         "staging_count": 100,
//         "target_count": 100
//       }
//     },
//     "TESTDB": {
//       "CHECKDEFAULT": {
//         "source_count": 8,
//         "staging_count": 8,
//         "target_count": 8
//       },
//       "CHECKDUPLICATE": {
//         "source_count": 17,
//         "staging_count": 17,
//         "target_count": 17
//       },
//       "CHECKKEYWORDS": {
//         "source_count": 1,
//         "staging_count": 1,
//         "target_count": 1
//       },
//       "CHECKPKKEYCOL": {
//         "source_count": 3,
//         "staging_count": 3,
//         "target_count": 3
//       },
//       "CHECKSAMENAME": {
//         "source_count": 0,
//         "staging_count": 0,
//         "target_count": 0
//       },
//       "INVENTORIES": {
//         "source_count": 1112,
//         "staging_count": 1112,
//         "target_count": 1112
//       },
//       "MARKS": {
//         "source_count": 100000,
//         "staging_count": 100000,
//         "target_count": 100000
//       },
//       "TEST_MAS_DATE": {
//         "source_count": 846,
//         "staging_count": 846,
//         "target_count": 846
//       },
//       "TEST_MAS_EMP": {
//         "source_count": 846,
//         "staging_count": 846,
//         "target_count": 846
//       }
//     }
//   }
// }

const getPercentage = (partialValue, totalValue) => {
  return ceil((100 * parseInt(partialValue)) / parseInt(totalValue));
}

const computeOverAllData = (data) => {
  let obj = {};
  let tbcount = [];
  let perce = 0;
  let radialVal = [];
  const successData =[];
  const tableData= [];
  const radialCount = [];
  const getcolors =[];
  if (data.length !== 0) {
    Object.keys(data?.migration_data)?.map((schema) => {
      radialVal.push( getPercentage(Object.values(data?.migration_data[schema]).filter((y)=>y==="SUCCESS").length, Object.keys(data?.migration_data[schema]).length))
      const tables = Object.keys(data?.migration_data[schema]);
     for (let x of tables) {
        const count = data.migration_data[schema][x];
        tbcount.push(count);
        getcolors.push();
        console.log()
        tableData.push({
          schema: schema,
          tablename: x,
          migrationStatus: count
         
        });
      
      }
      radialCount.push(schema)
    });
    let partialValue = tbcount.filter((x) => x === "SUCCESS").length;
    let totalValue = tbcount.length
    perce = ceil((100 * parseInt(partialValue)) / parseInt(totalValue));
    console.log(radialCount, "radialCount", radialVal)
    obj.lable = radialCount
    obj.lableValue = radialVal
    obj.colors=getcolors
  }
  return {
    schemas: radialCount,
    guagePercentage: perce,
    obj: obj,
    tableData:tableData
  };
};

const computeSchemawiseData = (data,schema) => {
  let obj = {};
  let tbcount = [];
  let perce = 0;
  let radialVal = [];
  const radialCount = [];
  const radialTables =[];
  const radialTableVal =[];
  const getcolors =[];
  if (data.length !== 0) {
      radialVal.push(
        Object.keys(data?.migration_data[schema]).length
      )
      const tables = Object.keys(data?.migration_data[schema]);
      for (let x of tables) {
        const count = data.migration_data[schema][x];
        getcolors.push(count==="SUCCESS"?"#07bc0c":"#e74c3c");
        radialTables.push(x);
        radialTableVal.push(count=="SUCCESS"?100:100);
        tbcount.push(count);
      }
      radialCount.push(schema)
    let partialValue = tbcount.filter((x) => x === "SUCCESS").length;
    let totalValue = tbcount.length
    perce = ceil((100 * parseInt(partialValue)) / parseInt(totalValue));
    console.log(radialCount, "radialCount", radialVal)
    obj.lable = radialTables
    obj.lableValue = radialTableVal
    obj.colors=getcolors
  }
  
  return {
    schemas: radialCount,
    guagePercentage: perce,
    obj: obj
  };
};

const computeTableWiseData = (reconciliationData, filteredSchemaName) => {
  const selectedSchema = reconciliationData[filteredSchemaName];
  const tables =
    (selectedSchema && Object.keys(selectedSchema).map((table) => table)) || [];
  const datasetsForBarCharts = [];
  const sourceCountList = [];
  const stagingCountList = [];
  const targetCountList = [];
  selectedSchema &&
    Object.keys(selectedSchema).map((table) => {
      const tableData = selectedSchema[table];
      sourceCountList.push(tableData?.source_count);
      stagingCountList.push(tableData?.staging_count);
      targetCountList.push(tableData?.target_count);
    });
  datasetsForBarCharts.push({
    label: "Source",
    backgroundColor: "#7e372a",
    maxBarThickness: 50,
    data: sourceCountList,
  });
  datasetsForBarCharts.push({
    label: "Staging",
    backgroundColor: "#f8b2a5",
    maxBarThickness: 50,
    data: stagingCountList,
  });
  datasetsForBarCharts.push({
    label: "Target",
    backgroundColor: "#f26a51",
    maxBarThickness: 50,
    data: targetCountList,
  });
  return {
    labels: tables,
    datasets: datasetsForBarCharts,
  };
};

export { computeOverAllData, computeSchemawiseData, computeTableWiseData };
