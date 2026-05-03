import { useState } from "react";
import { toast } from "sonner";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import {
  Loader2,
  FileSignature,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  Banknote,
  Sparkles,
} from "lucide-react";

import {
  api,
  loanFields,
  formatCurrency,
} from "./api";

import { useAuth } from "./auth";

export default function LoanApply() {
  const { user } = useAuth();

  const [form, setForm] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [explain, setExplain] =
    useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const missing =
      loanFields.filter(
        (field) =>
          form[field.key] ===
            undefined ||
          form[field.key] === ""
      );

    if (missing.length) {
      toast.error(
        "Fill all required fields"
      );
      return;
    }

    const payload = {
      user_id: user.user_id,
      ...form,
    };

    setLoading(true);

    try {
      const resultData =
        await api(
          "/apply-loan",
          {
            method: "POST",
            body: JSON.stringify(
              payload
            ),
          }
        );

      const explainData =
        await api(
          "/explain/loan-approval",
          {
            method: "POST",
            body: JSON.stringify(
              payload
            ),
          }
        );

      setResult(resultData);
      setExplain(explainData);

      toast.success(
        "Loan decision generated"
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const featureChart =
    explain?.feature_impact
      ? Object.entries(
          explain.feature_impact
        ).map(
          ([name, value]) => ({
            name,
            value:
              Number(value),
          })
        )
      : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-4xl">
          Loan Origination
        </h1>

        <p className="text-sm text-stone-500 mt-2">
          AI-powered
          underwriting
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <form
          onSubmit={submit}
          className="surface-card lg:col-span-3 p-7"
        >
          <div className="flex gap-2 mb-6">
            <FileSignature className="w-4 h-4" />
            <h2 className="font-heading text-xl">
              Applicant Profile
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {loanFields.map(
              (field) => (
                <div
                  key={
                    field.key
                  }
                >
                  <label className="crm-label">
                    {
                      field.label
                    }
                  </label>

                  <input
                    type="number"
                    step="any"
                    className="crm-input"
                    placeholder={
                      field.placeholder
                    }
                    value={
                      form[
                        field.key
                      ] || ""
                    }
                    onChange={(
                      e
                    ) =>
                      setForm({
                        ...form,
                        [
                          field.key
                        ]:
                          Number(
                            e
                              .target
                              .value
                          ),
                      })
                    }
                  />
                </div>
              )
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Run Decision
              </>
            )}
          </button>
        </form>

        <div className="surface-card lg:col-span-2 p-7">
          {!result ? (
            <p className="text-sm text-stone-500">
              Submit to get
              decision
            </p>
          ) : (
            <>
              <div className="flex gap-3">
                <span>
                  {result.approval_prediction ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Approved
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </>
                  )}
                </span>

                <span>
                  {result.fraud_prediction ? (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      Fraud
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Safe
                    </>
                  )}
                </span>
              </div>

              <div className="mt-6">
                <p className="crm-label">
                  Recommended
                  Loan
                </p>

                <h2 className="font-heading text-4xl">
                  {formatCurrency(
                    result.recommended_loan_amount
                  )}
                </h2>
              </div>

              <div className="mt-4 text-xs text-stone-500 flex gap-2">
                <Banknote className="w-4 h-4" />
                AI decision
                complete
              </div>
            </>
          )}
        </div>
      </div>

      {featureChart.length >
        0 && (
        <div className="surface-card p-7">
          <h2 className="font-heading text-2xl mb-5">
            Explainability
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={
                featureChart
              }
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
              />
              <Tooltip />

              <Bar dataKey="value">
                {featureChart.map(
                  (
                    item,
                    index
                  ) => (
                    <Cell
                      key={
                        index
                      }
                      fill={
                        item.value >=
                        0
                          ? "#064E3B"
                          : "#BE123C"
                      }
                    />
                  )
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}