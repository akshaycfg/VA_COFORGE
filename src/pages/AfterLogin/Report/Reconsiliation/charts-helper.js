const computeOverAllData = (data) => {
  let countSource = 0;
  let countStaging = 0;
  let countTarget = 0;
  let obj = {};
  let arobj = {};
  let tableData = [];
  if (data.length !== 0) {
    Object.keys(data?.reconciliation_data)?.map((schema) => {
      const tables = Object.keys(data?.reconciliation_data[schema]);
      for (let x of tables) {
        const count = data.reconciliation_data[schema][x];
        countSource += count?.source_count !== "error" && count.source_count;
        countStaging += count?.staging_count !== "error" && count.staging_count;
        countTarget += count?.target_count !== "error" && count.target_count;
        tableData.push({
          schema: schema,
          tablename: x,
          source: count?.source_count === "error" ? 0 : count?.source_count,
          staging: count?.staging_count === "error" ? 0 : count?.staging_count,
          target: count?.target_count === "error" ? 0 : count?.target_count,
        });
      }
    });
    obj.countSource = countSource;
    obj.countStaging = countStaging;
    obj.countTarget = countTarget;
    arobj.labels = Object.keys(data?.reconciliation_data);
    arobj.datasets = [countSource, countStaging, countTarget];
  }
  return {
    schemas:
      (data?.reconciliation_data && Object.keys(data?.reconciliation_data)) ||
      [],
    data: obj,
    tableData: tableData,
  };
};

const computeSchemawiseData = (data) => {
  const schemas =
    typeof data === "object" && data?.reconciliation_data
      ? Object.keys(data?.reconciliation_data).map((schema) => {
          return {
            name: schema,
            countSource: Object.values(data?.reconciliation_data[schema])
              .map((item) => item.source_count)
              .reduce((partialSum, a) => {
                const param = a === "error" ? 0 : a;
                return param + partialSum;
              }, 0),
            countStaging: Object.values(data?.reconciliation_data[schema])
              .map((item) => item.staging_count)
              .reduce((partialSum, a) => {
                const param = a === "error" ? 0 : a;
                return param + partialSum;
              }, 0),
            countTarget: Object.values(data?.reconciliation_data[schema])
              .map((item) => item.target_count)
              .reduce((partialSum, a) => {
                const param = a === "error" ? 0 : a;
                return param + partialSum;
              }, 0),
          };
        })
      : [];
  const labelsForBarCharts =
    typeof data === "object" && data?.reconciliation_data
      ? Object.keys(data.reconciliation_data).map((schema) => schema)
      : [];
  const datasetsForBarCharts = [];
  let sourceCountList = [];
  let stagingCountList = [];
  let targetCountList = [];
  if (typeof data === "object" && data.reconciliation_data) {
    Object.keys(data.reconciliation_data).map((schema) => {
      // source count
      sourceCountList = [
        ...sourceCountList,
        Object.values(data.reconciliation_data[schema])
          .map((item) => item.source_count)
          .reduce((partialSum, a) => {
            const param = a === "error" ? 0 : a;
            return param + partialSum;
          }, 0),
      ];
      // staging count
      stagingCountList = [
        ...stagingCountList,
        Object.values(data.reconciliation_data[schema])
          .map((item) => item.staging_count)
          .reduce((partialSum, a) => {
            const param = a === "error" ? 0 : a;
            return param + partialSum;
          }, 0),
      ];
      // target count
      targetCountList = [
        ...targetCountList,
        Object.values(data.reconciliation_data[schema])
          .map((item) => item.target_count)
          .reduce((partialSum, a) => {
            const param = a === "error" ? 0 : a;
            return param + partialSum;
          }, 0),
      ];
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
  }
  return {
    schemas: schemas,
    labels: labelsForBarCharts,
    datasets: datasetsForBarCharts,
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
