"use client";

import { getCustomers } from "@/services/customer";
import { getAuditLogs } from "@/services/audit";
import { getForecast } from "@/services/forecast";

export const useDashboard = () => {
  const fetchDashboardData =
    async () => {
      const [
        customers,
        auditLogs,
        forecast,
      ] = await Promise.all([
        getCustomers(),
        getAuditLogs(),
        getForecast(),
      ]);

      return {
        customers,
        auditLogs,
        forecast,
      };
    };

  return {
    fetchDashboardData,
  };
};