"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface BreakdownChartProps {
  data: { name: string; count: number }[];
}

export default function BreakdownChart({ data }: BreakdownChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e0e3e5"
          horizontal={false}
        />
        <XAxis
          type="number"
          stroke="#43474e"
          fontSize={12}
          allowDecimals={false}
        />
        <YAxis
          dataKey="name"
          type="category"
          stroke="#43474e"
          fontSize={12}
          width={80}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: "1px solid #e0e3e5" }}
        />
        <Bar dataKey="count" fill="#00685f" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
