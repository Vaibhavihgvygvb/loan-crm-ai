import {
  useEffect,
  useState,
} from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Loader2,
  TrendingUp,
} from "lucide-react";

import { api } from "./api";

export default function Forecast() {
  const [forecast, setForecast] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await api(
          "/forecast/loan-demand"
        );

        if (mounted) {
          setForecast(data);
        }
      } catch {
        if (mounted) {
          setForecast(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const chartData =
    forecast?.forecast_next_3_months?.map(
      (value, index) => ({
        month: `Month ${
          index + 1
        }`,
        value:
          Math.round(value),
      })
    ) || [];

  const total =
    chartData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  const average =
    chartData.length > 0
      ? total /
        chartData.length
      : 0;

  const peak =
    chartData.reduce(
      (max, item) =>
        item.value >
        (max?.value || 0)
          ? item
          : max,
      null
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-4xl">
          Loan Demand Forecast
        </h1>

        <p className="text-sm text-stone-500 mt-2">
          Predictive analytics
        </p>
      </div>

      {loading ? (
        <div className="flex gap-2 items-center text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Computing...
        </div>
      ) : chartData.length ===
        0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-5">
            <Stat
              label="Total Projected"
              value={total.toLocaleString()}
            />

            <Stat
              label="Average"
              value={Math.round(
                average
              ).toLocaleString()}
            />

            <Stat
              label="Peak Month"
              value={
                peak?.month ||
                "—"
              }
            />
          </div>

          <div className="surface-card p-7">
            <h2 className="font-heading text-2xl mb-5">
              Forecast Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <AreaChart
                data={
                  chartData
                }
              >
                <defs>
                  <linearGradient
                    id="forecastFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#047857"
                      stopOpacity={
                        0.4
                      }
                    />

                    <stop
                      offset="100%"
                      stopColor="#047857"
                      stopOpacity={
                        0
                      }
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#064E3B"
                  fill="url(#forecastFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="surface-card p-7">
            <div className="grid grid-cols-3 gap-4">
              {chartData.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.month
                    }
                    className="border-l-2 border-emerald-900 pl-3"
                  >
                    <div className="text-xs text-stone-500">
                      {
                        item.month
                      }
                    </div>

                    <div className="font-heading text-2xl">
                      {item.value.toLocaleString()}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
}) {
  return (
    <div className="kpi-card">
      <div className="text-xs text-stone-500">
        {label}
      </div>

      <div className="text-2xl font-bold mt-3">
        {value}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="surface-card p-12 text-center">
      <TrendingUp className="w-6 h-6 mx-auto text-stone-400" />

      <h2 className="font-heading text-xl mt-3">
        No forecast data
      </h2>

      <p className="text-sm text-stone-500 mt-2">
        Forecast endpoint
        returned empty data
      </p>
    </div>
  );
}