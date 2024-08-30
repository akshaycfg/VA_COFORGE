import "./index.scss";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  elements,
} from "chart.js";
import { values } from "underscore";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ chartData, customWidth }) => {
  const data = {
    labels: chartData?.labels || [],
    datasets: chartData?.datasets || [],
  };
  const options = {
    barValueSpacing: 10,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          // The y-axis value will start from zero
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <>
      <div className="chart-container" style={{ width: customWidth || "100%" }}>
        <Bar responsive={true} data={data} height={400} options={options} />
      </div>
    </>
  );
};

export default Chart;
