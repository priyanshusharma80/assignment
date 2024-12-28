"use client";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useRef, useEffect } from "react";
import { FiMaximize2 } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

function generateRandomData(totalPoints: number, startValue: number, fluctuation: number) {
  let data = [startValue];
  for (let i = 1; i < totalPoints; i++) {
    const randomChange = (Math.random() - 0.5) * fluctuation * 2; // Random value between -fluctuation and +fluctuation
    data.push(data[i - 1] + randomChange);
  }
  return data;
}

export default function LineChart() {
  const [activeRange, setActiveRange] = useState("1w");

  const days = 7; // Number of days
  const pointsPerDay = 20; // Data points per day
  const totalDataPoints = days * pointsPerDay; // Total data points

  const labels = Array.from({ length: totalDataPoints }, (_, index) => `Point ${index + 1}`);
  const prices = generateRandomData(totalDataPoints, 63000, 200);

  const gradientRef = useRef<CanvasGradient | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      gradientRef.current = ctx.createLinearGradient(0, 0, 0, 400);
      gradientRef.current.addColorStop(0, "rgba(97, 95, 245, 0.1)");
      gradientRef.current.addColorStop(1, "rgba(97, 95, 245, 0.2)");
    }
  }, []);

  const verticalLines = Array.from({ length: 7 }, (_, index) => ({

    x: Math.floor((index + 1) * (totalDataPoints / 8)), // Equal intervals
  }));

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "#615ff5",
        backgroundColor: gradientRef.current || "rgba(97, 95, 245, 0.2)",
        fill: true,
        pointBorderColor: "#615ff5",
        pointBackgroundColor: "#ffffff",
        pointHoverBorderWidth: 3,
        tension: 0,
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any[]) => `Point: ${tooltipItems[0].label}`,
          label: (tooltipItem: any) => `$${tooltipItem.raw.toFixed(2)} USD`,
        },
      },
      annotation: {
        annotations: {
          ...verticalLines.reduce((acc: { [key: string]: any }, { x }, index) => {
            acc[`verticalLine${index}`] = {
              type: "line",
              xMin: x,
              xMax: x,
              borderColor: "rgba(0, 0, 0, 0.2)", // Dark lines
              borderWidth: 1,
              label: {
                content: `Line ${index + 1}`,
                enabled: true,
                position: "top",
              },
            };
            return acc;
          }, {}),
          middleVerticalLine: {
            type: "line",
            xMin: 96,
            xMax: 96,
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [5, 5], // Dotted line
            label: {
              content: "Mid Vertical",
              enabled: true,
              position: "top",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
            },
          },
          middleHorizontalLine: {
            type: "line",
            yMin: 63000,
            yMax: 63000,
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 1,
            borderDash: [5, 5], // Dotted line
            label: {
              content: "Mid Horizontal",
              enabled: true,
              position: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
            },
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide all default grid lines
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
    onHover: (event: any, chartElement: any[]) => {
      if (chartElement.length > 0) {
        // Do nothing to data on hover
      }
    },
  };

  const handleFullscreen = () => {
    const chartCanvas = document.querySelector("canvas");
    const image = chartCanvas?.toDataURL("image/png");
    if (image) {
      const newTab = window.open();
      newTab?.document.write(`<img src="${image}" style="width:65%;" />`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2 flex-col lg:flex-row gap-y-6">
        <div className="flex justify-between ">
          <div className="flex space-x-6">
            <button
              onClick={handleFullscreen}
              className="flex text-gray-600 hover:text-primary space-x-2 text-sm"
            >
              <FiMaximize2 size={20} />
              <span className="text-lg text-[#6F7177]">Fullscreen</span>
            </button>
            <button className="flex text-gray-600 hover:text-primary space-x-2 text-sm">
              <IoAddCircleOutline size={20} />
              <span className="text-lg text-[#6F7177]">Compare</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-4 justify-end flex-wrap gap-y-4">
          {["1d", "3d", "1w", "1m", "6m", "1y", "max"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-4 py-1 text-lg rounded-md ${activeRange === range
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-[#6F7177] hover:bg-primary hover:text-white"
                }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] w-[65vw] bg-white rounded-lg p-4">
        <Line data={data} options={options} />
        <div
          className="box box-1"
        >
          <p>64,850.35</p>
        </div>
        <div
          className="box box-2"
        >
          <p>63,179.71</p>
        </div>
      </div>
    </div>
  );
}

