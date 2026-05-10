"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/cards/StatCard";
import LoanTrendChart from "@/components/charts/LoanTrendChart";
import ForecastChart from "@/components/charts/ForecastChart";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const {
    fetchDashboardData,
  } = useDashboard();

  const [loading, setLoading] =
    useState(true);

  const [dashboardData, setDashboardData] =
    useState<any>(null);

  useEffect(() => {
    const loadData =
      async () => {
        try {
          const data =
            await fetchDashboardData();

          setDashboardData(
            data
          );
        } finally {
          setLoading(false);
        }
      };

    loadData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  const totalApplications =
    dashboardData.auditLogs.length;

  const fraudAlerts =
    dashboardData.auditLogs.filter(
      (item: any) =>
        item.fraud_prediction
    ).length;

  const approvedLoans =
    dashboardData.auditLogs.filter(
      (item: any) =>
        item.approval_prediction
    ).length;

  const approvalRate =
    totalApplications > 0
      ? (
          (approvedLoans /
            totalApplications) *
          100
        ).toFixed(2)
      : 0;

  const loanTrendData =
    dashboardData.forecast.map(
      (item: any) => ({
        month:
          item.month,
        loans:
          item.demand,
      })
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Applications"
          value={
            totalApplications
          }
        />

        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
        />

        <StatCard
          title="Fraud Alerts"
          value={
            fraudAlerts
          }
        />

        <StatCard
          title="Customers"
          value={
            dashboardData
              .customers
              .length
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LoanTrendChart
          data={
            loanTrendData
          }
        />

        <ForecastChart
          data={
            dashboardData
              .forecast
          }
        />
      </div>
    </div>
  );
}