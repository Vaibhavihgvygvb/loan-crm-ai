"use client";

import { useState } from "react";
import DriftCard from "@/components/cards/DriftCard";
import DriftChart from "@/components/charts/DriftChart";
import { useDrift } from "@/hooks/useDrift";

export default function DriftPage() {
  const {
    checkDrift,
  } = useDrift();

  const [driftData, setDriftData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const runCheck =
    async () => {
      try {
        setLoading(true);

        const payload = {
          monthly_income: 500000,
          credit_score: 750,
          existing_emi: 25000,
        };

        const data =
          await checkDrift(
            payload
          );

        setDriftData(
          data
        );
      } finally {
        setLoading(false);
      }
    };

  const chartData =
    driftData?.drift_report
      ? Object.entries(
          driftData.drift_report
        ).map(
          (
            [
              feature,
              value,
            ]: any
          ) => ({
            feature,
            score:
              value.drift_score,
          })
        )
      : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Drift Monitoring
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor model drift across features
        </p>
      </div>

      <button
        onClick={
          runCheck
        }
        className="px-6 py-3 bg-slate-900 text-white rounded-lg"
      >
        {loading
          ? "Running..."
          : "Run Drift Check"}
      </button>

      {driftData && (
        <>
          <div className="grid grid-cols-3 gap-6">
            {Object.entries(
              driftData.drift_report
            ).map(
              (
                [
                  featureName,
                  feature,
                ]: any
              ) => (
                <DriftCard
                  key={
                    featureName
                  }
                  featureName={
                    featureName
                  }
                  feature={
                    feature
                  }
                />
              )
            )}
          </div>

          <DriftChart
            data={
              chartData
            }
          />
        </>
      )}
    </div>
  );
}