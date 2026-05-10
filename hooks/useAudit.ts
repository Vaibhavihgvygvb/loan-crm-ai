"use client";

import { getAuditLogs } from "@/services/audit";

export const useAudit = () => {
  const fetchAuditLogs =
    async () => {
      const logs =
        await getAuditLogs();

      return logs;
    };

  return {
    fetchAuditLogs,
  };
};
