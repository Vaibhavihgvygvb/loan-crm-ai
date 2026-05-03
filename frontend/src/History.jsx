import {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  FileSignature,
} from "lucide-react";

import {
  api,
  formatCurrency,
} from "./api";

import { useAuth } from "./auth";

export default function History() {
  const { user } = useAuth();

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user?.user_id) return;

    let mounted = true;

    (async () => {
      try {
        const data = await api(
          `/history/${user.user_id}`
        );

        if (mounted) {
          setItems(
            data.applications || []
          );
        }
      } catch {
        if (mounted) {
          setItems([]);
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
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-4xl">
          My Applications
        </h1>

        <p className="text-sm text-stone-500 mt-2">
          Application history
        </p>
      </div>

      {loading ? (
        <div className="flex gap-2 items-center text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b">
              <tr>
                <Th>
                  Application
                </Th>
                <Th>
                  Approval
                </Th>
                <Th>
                  Fraud
                </Th>
                <Th className="text-right">
                  Loan Amount
                </Th>
              </tr>
            </thead>

            <tbody>
              {items.map(
                (item, index) => (
                  <tr
                    key={
                      item.id ||
                      index
                    }
                    className="border-b"
                  >
                    <Td>
                      <div className="flex gap-3 items-center">
                        <FileSignature className="w-4 h-4" />

                        Loan #
                        {item.id}
                      </div>
                    </Td>

                    <Td>
                      <Badge
                        tone={
                          item.approval_prediction
                            ? "green"
                            : "gray"
                        }
                      >
                        {item.approval_prediction
                          ? "Approved"
                          : "Rejected"}
                      </Badge>
                    </Td>

                    <Td>
                      <Badge
                        tone={
                          item.fraud_prediction
                            ? "rose"
                            : "green"
                        }
                      >
                        {item.fraud_prediction
                          ? "Risk"
                          : "Safe"}
                      </Badge>
                    </Td>

                    <Td className="text-right font-mono">
                      {formatCurrency(
                        item.recommended_loan_amount
                      )}
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

function Badge({
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
      <h2 className="font-heading text-xl">
        No applications yet
      </h2>

      <p className="text-sm text-stone-500 mt-2">
        Run your first loan
        decision
      </p>
    </div>
  );
}