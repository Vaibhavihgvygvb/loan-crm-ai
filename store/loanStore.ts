import { create } from "zustand";

import {
  LoanApplicationPayload,
  LoanDecisionResponse,
  LoanHistoryItem,
} from "@/types/loan";

interface LoanState {
  loanForm:
    LoanApplicationPayload | null;

  loanResult:
    LoanDecisionResponse | null;

  history: LoanHistoryItem[];

  setLoanForm: (
    payload: LoanApplicationPayload
  ) => void;

  setLoanResult: (
    result: LoanDecisionResponse
  ) => void;

  setHistory: (
    history: LoanHistoryItem[]
  ) => void;

  resetLoan: () => void;
}

export const useLoanStore =
  create<LoanState>((set) => ({
    loanForm: null,
    loanResult: null,
    history: [],

    setLoanForm: (payload) =>
      set({
        loanForm: payload,
      }),

    setLoanResult: (result) =>
      set({
        loanResult: result,
      }),

    setHistory: (history) =>
      set({
        history,
      }),

    resetLoan: () =>
      set({
        loanForm: null,
        loanResult: null,
      }),
  }));