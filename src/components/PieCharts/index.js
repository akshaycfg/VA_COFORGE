import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieCharts({data}) {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: data?.countSource, label: "Source", color: "#7e372a" },
            { id: 1, value: data?.countStaging, label: "Staging", color: "#f8b2a5" },
            { id: 2, value: data?.countTarget, label: "Target", color: "#f26a51" },
          ],
        },
      ]}
      margin={{ top: 10, bottom: 100, left: 10, right:50 }}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
        },
      }}
      width={400}
      height={320}
    />
  );
}
