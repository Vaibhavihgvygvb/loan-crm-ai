"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ForecastChartProps {
  data: {
    month: string;
    demand: number;
  }[];
}

export default function ForecastChart({
  data,
}: ForecastChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">
        Loan Demand Forecast
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="demand"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}