import { api } from "./api";
import { DriftResponse } from "@/types/drift";

export const runDriftCheck = async (
  payload: {
    monthly_income: number;
    credit_score: number;
    existing_emi: number;
  }
): Promise<DriftResponse> => {
  const response =
    await api.post<DriftResponse>(
      "/drift/check",
      payload
    );

  return response.data;
};