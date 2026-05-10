"use client";

import {
  runDriftCheck,
} from "@/services/drift";

export const useDrift = () => {
  const checkDrift =
    async (
      payload: {
        monthly_income: number;
        credit_score: number;
        existing_emi: number;
      }
    ) => {
      const result =
        await runDriftCheck(
          payload
        );

      return result;
    };

  return {
    checkDrift,
  };
};