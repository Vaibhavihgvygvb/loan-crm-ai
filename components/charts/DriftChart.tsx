"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DriftChartProps {
  data: {
    feature: string;
    score: number;
  }[];
}

export default function DriftChart({
  data,
}: DriftChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">
        Drift Analysis
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="score"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}