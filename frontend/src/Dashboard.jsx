import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import {
  FileSignature,
  CheckCircle2,
  ShieldAlert,
  Banknote,
  ArrowUpRight,
  TrendingUp,
  Loader2,
} from "lucide-react";

import {
  api,
  formatCurrency,
  formatNumber,
} from "./api";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [forecast, setForecast] =
    useState(null);

  const [audit, setAudit] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [d, f, a] =
          await Promise.all([
            api("/rm/dashboard"),
            api(
              "/forecast/loan-demand"
            ),
            api("/audit/logs"),
          ]);

        if (!mounted) return;

        setDashboard(d);
        setForecast(f);
        setAudit(
          Array.isArray(a) ? a : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const kpis = [
    {
      label: "Applications",
      value: formatNumber(
        dashboard?.total_applications
      ),
      icon: FileSignature,
    },
    {
      label: "Approved",
      value: formatNumber(
        dashboard?.approved_loans
      ),
      icon: CheckCircle2,
    },
    {
      label: "Fraud Cases",
      value: formatNumber(
        dashboard?.fraud_cases
      ),
      icon: ShieldAlert,
    },
    {
      label: "Avg Loan",
      value: formatCurrency(
        dashboard?.average_recommended_loan
      ),
      icon: Banknote,
    },
  ];

  const forecastData =
    forecast?.forecast_next_3_months?.map(
      (v, i) => ({
        month: `M${i + 1}`,
        value: Math.round(v),
      })
    ) || [];

  const trendData = Array.from({
    length: 12,
  }).map((_, i) => ({
    week: `W${i + 1}`,
    value:
      Math.round(
        (dashboard?.average_recommended_loan ||
          800000) /
          1000
      ) + i * 25,
  }));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-4xl">
            Dashboard
          </h1>

          <p className="text-sm text-stone-500 mt-2">
            Relationship manager
            analytics
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/loan-apply")
          }
          className="btn-primary"
        >
          New Loan
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {loading && (
        <div className="flex gap-2 items-center">
          <Loader2 className="animate-spin w-4 h-4" />
          Loading dashboard...
        </div>
      )}

      <div className="grid md:grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="kpi-card"
          >
            <div className="flex justify-between">
              <span>
                {kpi.label}
              </span>

              <kpi.icon className="w-4 h-4" />
            </div>

            <div className="mt-4 text-2xl font-bold">
              {kpi.value}
            </div>

            <div className="mt-2 text-xs flex gap-1 text-emerald-700">
              <TrendingUp className="w-3 h-3" />
              Active trend
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="surface-card p-6">
          <h3 className="font-heading text-xl mb-4">
            Loan Volume Trend
          </h3>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <AreaChart
              data={trendData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-heading text-xl mb-4">
            Demand Forecast
          </h3>

          <ResponsiveContainer
            width="100%"
            height={250}
          >
            <LineChart
              data={forecastData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="surface-card p-6">
        <h3 className="font-heading text-xl mb-4">
          Portfolio Composition
        </h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <BarChart
            data={[
              {
                name: "Approved",
                value:
                  dashboard?.approved_loans ||
                  0,
              },
              {
                name: "Fraud",
                value:
                  dashboard?.fraud_cases ||
                  0,
              },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value">
              <Cell fill="#064E3B" />
              <Cell fill="#BE123C" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}