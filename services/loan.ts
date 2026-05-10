import { api } from "./api";
import {
  LoanApplicationPayload,
  LoanDecisionResponse,
  LoanHistoryItem,
} from "@/types/loan";

export const applyLoan = async (
  payload: LoanApplicationPayload
): Promise<LoanDecisionResponse> => {
  const response =
    await api.post<LoanDecisionResponse>(
      "/apply-loan",
      payload
    );

  return response.data;
};

export const explainLoanDecision = async (
  payload: LoanApplicationPayload
): Promise<any> => {
  const response = await api.post(
    "/explain/loan-approval",
    payload
  );

  return response.data;
};

export const getLoanHistory = async (
  userId: string
): Promise<LoanHistoryItem[]> => {
  const response = await api.get<
    LoanHistoryItem[]
  >(`/history/${userId}`);

  return response.data;
};