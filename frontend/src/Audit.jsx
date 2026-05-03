import {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  ScrollText,
} from "lucide-react";

import {
  api,
  formatCurrency,
} from "./api";

export default function Audit() {
  const [logs, setLogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await api(
          "/audit/logs"
        );

        if (mounted) {
          setLogs(
            Array.isArray(data)
              ? data
              : []
          );
        }
      } catch {
        if (mounted) {
          setLogs([]);
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-4xl">
          Audit Logs
        </h1>

        <p className="text-sm text-stone-500 mt-2">
          Compliance trail
        </p>
      </div>

      {loading ? (
        <div className="flex gap-2 items-center text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      ) : logs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b">
              <tr>
                <Th>Event</Th>
                <Th>User</Th>
                <Th>Approval</Th>
                <Th>Fraud</Th>
                <Th className="text-right">
                  Amount
                </Th>
                <Th>
                  Timestamp
                </Th>
              </tr>
            </thead>

            <tbody>
              {logs.map(
                (log, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <Td>
                      EVT-
                      {String(
                        index + 1
                      ).padStart(
                        5,
                        "0"
                      )}
                    </Td>

                    <Td>
                      {
                        log.user_id
                      }
                    </Td>

                    <Td>
                      <Pill
                        tone={
                          log.approval_prediction
                            ? "green"
                            : "gray"
                        }
                      >
                        {log.approval_prediction
                          ? "Approved"
                          : "Rejected"}
                      </Pill>
                    </Td>

                    <Td>
                      <Pill
                        tone={
                          log.fraud_prediction
                            ? "rose"
                            : "green"
                        }
                      >
                        {log.fraud_prediction
                          ? "Risk"
                          : "Safe"}
                      </Pill>
                    </Td>

                    <Td className="text-right font-mono">
                      {formatCurrency(
                        log.recommended_loan_amount
                      )}
                    </Td>

                    <Td>
                      {log.timestamp ||
                        "—"}
                    </Td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Th({
  children,
  className = "",
}) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs uppercase ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}) {
  return (
    <td
      className={`px-6 py-4 ${className}`}
    >
      {children}
    </td>
  );
}

function Pill({
  children,
  tone,
}) {
  const tones = {
    green:
      "bg-emerald-50 text-emerald-800 border border-emerald-200",
    rose:
      "bg-rose-50 text-rose-800 border border-rose-200",
    gray:
      "bg-stone-100 text-stone-700 border border-stone-200",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="surface-card p-12 text-center">
      <ScrollText className="w-6 h-6 mx-auto text-stone-400" />

      <h2 className="font-heading text-xl mt-3">
        No audit records
      </h2>

      <p className="text-sm text-stone-500 mt-2">
        Audit trail will
        appear here
      </p>
    </div>
  );
}