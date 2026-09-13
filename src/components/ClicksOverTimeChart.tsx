"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ClicksOverTimeChartProps {
  data: { date: string; clicks: number }[];
}

export default function ClicksOverTimeChart({ data }: ClicksOverTimeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" />
        <XAxis dataKey="date" stroke="#43474e" fontSize={12} />
        <YAxis stroke="#43474e" fontSize={12} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e0e3e5" }}
        />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="#00685f"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}