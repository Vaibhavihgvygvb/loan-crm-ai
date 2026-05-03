import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Loader2,
  Users,
} from "lucide-react";

import {
  api,
  formatCurrency,
} from "./api";

const AVATARS = [
  "https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=srgb&fm=jpg&w=200&q=80",
  "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=srgb&fm=jpg&w=200&q=80",
  "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=srgb&fm=jpg&w=200&q=80",
];

export default function Customers() {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await api(
          "/rm/customers/"
        );

        if (mounted) {
          setCustomers(
            data.customers || []
          );
        }
      } catch {
        if (mounted) {
          setCustomers([]);
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

  const filtered = useMemo(
    () =>
      customers.filter((c) =>
        JSON.stringify(c)
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      ),
    [customers, search]
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end gap-4">
        <div>
          <h1 className="font-heading text-4xl">
            Customer 360
          </h1>

          <p className="text-sm text-stone-500 mt-2">
            Customer portfolio
          </p>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search customers"
            className="crm-input pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex gap-2 items-center">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(
            (
              customer,
              index
            ) => {
              const name =
                customer.customer_name ||
                customer.name ||
                `Customer ${
                  customer.user_id ||
                  index + 1
                }`;

              const avatar =
                AVATARS[
                  index %
                    AVATARS.length
                ];

              return (
                <div
                  key={index}
                  className="surface-card p-6"
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-heading text-lg">
                        {name}
                      </h3>

                      <p className="text-xs text-stone-500">
                        User ID:{" "}
                        {
                          customer.user_id
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <Metric
                      label="Loan"
                      value={formatCurrency(
                        customer.recommended_loan_amount
                      )}
                    />

                    <Metric
                      label="Credit Score"
                      value={
                        customer.credit_score ||
                        "—"
                      }
                    />
                  </div>

                  <div className="mt-4 flex gap-2">
                    {customer.approval_prediction !==
                      undefined && (
                      <Pill
                        tone={
                          customer.approval_prediction
                            ? "green"
                            : "gray"
                        }
                      >
                        {customer.approval_prediction
                          ? "Approved"
                          : "Rejected"}
                      </Pill>
                    )}

                    {customer.fraud_prediction ? (
                      <Pill tone="rose">
                        Fraud
                      </Pill>
                    ) : null}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

function Pill({
  children,
  tone,
}) {
  const styles = {
    green:
      "bg-emerald-50 text-emerald-800 border border-emerald-200",
    rose:
      "bg-rose-50 text-rose-800 border border-rose-200",
    gray:
      "bg-stone-100 text-stone-700 border border-stone-200",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs text-stone-500">
        {label}
      </p>

      <h4 className="font-heading text-lg">
        {value}
      </h4>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="surface-card p-12 text-center">
      <Users className="w-6 h-6 mx-auto text-stone-400" />

      <h2 className="font-heading text-xl mt-3">
        No customers found
      </h2>

      <p className="text-sm text-stone-500 mt-2">
        Try another search
      </p>
    </div>
  );
}