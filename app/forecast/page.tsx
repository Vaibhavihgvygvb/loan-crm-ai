"use client";

import { useEffect, useState } from "react";
import ForecastChart from "@/components/charts/ForecastChart";
import { useForecast } from "@/hooks/useForecast";

export default function ForecastPage() {
  const {
    fetchForecast,
  } = useForecast();

  const [forecastData, setForecastData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadForecast =
      async () => {
        try {
          const data =
            await fetchForecast();

          setForecastData(
            data
          );
        } finally {
          setLoading(false);
        }
      };

    loadForecast();
  }, [fetchForecast]);

  if (loading) {
    return (
      <div>
        Loading forecast...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Forecast
        </h1>

        <p className="text-slate-500 mt-2">
          Future loan demand analysis
        </p>
      </div>

      <ForecastChart
        data={
          forecastData
        }
      />
    </div>
  );
}