import React from "react";
import ReactApexChart from "react-apexcharts";
import { RadialBarChart, RadialBar } from "recharts";

const RadialGraph = ({ chartData ,colors,offSetX}) => {
  console.log(chartData, "chartData");
  // Sample data
 
  const d = {
    series: chartData.length !== 0 ? chartData.lableValue : [],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          offsetX: offSetX,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            show: false,
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: chartData.length !== 0 ? chartData.colors : colors,//  
      labels: chartData.length !== 0 ? chartData.lable : [],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 0,
        offsetY: 0,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: true,
            },
          },
        },
      ],
    },
  };

  return (
    <ReactApexChart
      options={d.options}
      series={d.series}
      type="radialBar"
      height={390}
    />
  );
};

export default RadialGraph;
