"use client";

import { getForecast } from "@/services/forecast";

export const useForecast = () => {
  const fetchForecast =
    async () => {
      const forecast =
        await getForecast();

      return forecast;
    };

  return {
    fetchForecast,
  };
};