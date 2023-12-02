import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = ({ xData, yData, yLabel }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(51, 51, 51,0.25)",
        },
      },
      y: {
        grid: {
          color: "rgba(51, 51, 51,0.25)",
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2, // Width of the bar borders
      },
    },
  };

  const data = {
    labels: xData,
    datasets: [
      {
        label: yLabel,
        data: yData,
        borderColor: "#F0C3F1",
        backgroundColor: "#F0C3F1",
        barThickness: 25,
      },
    ],
  };
  return <Bar data={data} options={options} redraw={true} />;
};

export default BarGraph;
