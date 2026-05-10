"use client";

import { useState } from "react";
import { useLoan } from "@/hooks/useLoan";
import { toast } from "sonner";
import LoanResultCard from "@/components/cards/LoanResultCard";

export default function LoanForm() {
  const { submitLoan } =
    useLoan();

  const [result, setResult] =
    useState<any>(null);

  const [form, setForm] =
    useState({
      monthly_income: 0,
      existing_emi: 0,
      credit_score: 0,
      employment_years: 0,
      relationship_years: 0,
      avg_bank_balance: 0,
      collateral_value: 0,
      fraud_risk_score: 0,
      bank_policy_multiplier: 0,
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        Number(
          e.target.value
        ),
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await submitLoan(
          form
        );

      setResult(
        response
      );

      toast.success(
        "Loan decision generated"
      );
    } catch {
      toast.error(
        "Loan submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const fields =
    Object.keys(form);

  return (
    <div className="grid grid-cols-2 gap-8">
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4 bg-white p-8 rounded-xl border border-slate-200"
      >
        <h2 className="text-2xl font-bold">
          Apply Loan
        </h2>

        {fields.map(
          (field) => (
            <input
              key={field}
              name={field}
              type="number"
              placeholder={field}
              value={
                form[
                  field as keyof typeof form
                ]
              }
              onChange={
                handleChange
              }
            />
          )
        )}

        <button
          type="submit"
          disabled={
            loading
          }
          className="w-full bg-slate-900 text-white py-3 rounded-lg"
        >
          {loading
            ? "Submitting..."
            : "Submit Loan"}
        </button>
      </form>

      {result && (
        <LoanResultCard
          result={result}
        />
      )}
    </div>
  );
}