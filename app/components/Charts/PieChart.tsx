"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { palette } from "@/app/constants/palette";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface PieChartProps {
  title: string;
  subtitle: string;
  labels: string[];
  values: number[];
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  subtitle,
  labels,
  values,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: palette.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const label = context.label || "";
            return `${label}: ${value}%`;
          },
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          size: 18,
          weight: "bold",
        },
        formatter: (value: number) => (value >= 5 ? `${value}%` : ""),
        anchor: "center" as const,
        align: "center" as const,
      },
    },
  };

  return (
    <div className="p-2">
      <h3 className="mb-4 text-[13px] uppercase text-gray">{title}</h3>
      <h4 className="mb-4 text-center font-bold text-[14px]">{subtitle}</h4>
      <Pie data={data} options={options} />
      <div className="flex flex-wrap gap-3 mt-4">
        {labels
          .map((label, i) => ({ label, value: values[i], color: palette[i] }))
          .sort((a, b) => b.value - a.value)
          .map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="py-2 px-4 text-white text-[14px] rounded-full flex items-center"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-white pr-2">✔</span>
                {item.label}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PieChart;
