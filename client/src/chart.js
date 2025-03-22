import React from "react";
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

export const ScheduleChart = (props) => {
  let indexAxis = props.vertical ? "y" : "x";
  let scaleAxis = props.vertical ? "x" : "y";
  let options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Hours of Operation for ${props.dayOfWeek}, ${props.monthDate}`,
      },
    },
    indexAxis: indexAxis,
    scales: {},
  };

  let minStart = 1000;
  let maxEnd = 0;

  for (let outing of props.today) {
    if (outing.openFloat < minStart) {
      minStart = Math.floor(outing.openFloat);
    }
    if (outing.closeFloat > maxEnd) {
      maxEnd = Math.ceil(outing.closeFloat);
    }
  }

  options.scales[scaleAxis] = {
    min: minStart - 1,
    max: maxEnd + 1,
    ticks: {
      callback: function (value, index, ticks) {
        if (value < 10) {
          return `0${value}:00 AM`;
        }
        if (value < 12) {
          return `${value}:00 AM`;
        }
        if (value === 12) {
          return `12:00 PM`;
        }
        if (value < 22) {
          return `0${value - 12}:00 PM`;
        }
        return `${value - 12}:00 PM`;
      },
    },
  };

  const labels = props.today.map((outing) => {
    return outing.venue;
  });

  const data = {
    labels,
    datasets: [
      {
        data: props.today.map((outing) => {
          return [outing.openFloat, outing.closeFloat];
        }),
        backgroundColor: [
          "violet",
          "lightskyblue",
          "gold",
          "lightsalmon",
          "mediumpurple",
          "palegreen",
          "tomato",
          "darkviolet",
          "deeppink",
          "deepskyblue",
          "yellowgreen",
        ],
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default ScheduleChart;
