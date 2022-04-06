import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const TrendLineChart = ({ strokeWidth, data, xkey, ykeys }) => {
  const colors = [
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#0ea5e9",
    "#1d4ed8",
    "#4338ca",
    "#6d28d9",
    "#0369a1",
  ];

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xkey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {ykeys.map((key, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={key}
            stroke={colors[i]}
            strokeWidth={strokeWidth}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
