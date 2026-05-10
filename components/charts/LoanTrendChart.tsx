"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LoanTrendChartProps {
  data: {
    month: string;
    loans: number;
  }[];
}

export default function LoanTrendChart({
  data,
}: LoanTrendChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">
        Loan Trends
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="loans"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}