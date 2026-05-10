"use client";

import { useEffect, useState } from "react";
import AuditCard from "@/components/cards/AuditCard";
import { useAudit } from "@/hooks/useAudit";

export default function AuditPage() {
  const {
    fetchAuditLogs,
  } = useAudit();

  const [logs, setLogs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadLogs =
      async () => {
        try {
          const data =
            await fetchAuditLogs();

          setLogs(
            data
          );
        } finally {
          setLoading(false);
        }
      };

    loadLogs();
  }, [fetchAuditLogs]);

  if (loading) {
    return (
      <div>
        Loading audit logs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Audit Logs
        </h1>

        <p className="text-slate-500 mt-2">
          Compliance and underwriting records
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {logs.map(
          (audit, index) => (
            <AuditCard
              key={index}
              audit={audit}
            />
          )
        )}
      </div>
    </div>
  );
}