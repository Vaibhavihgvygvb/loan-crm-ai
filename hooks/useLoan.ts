"use client";

import {
  applyLoan,
  getLoanHistory,
  explainLoanDecision,
} from "@/services/loan";

import {
  LoanApplicationPayload,
} from "@/types/loan";

import {
  useLoanStore,
} from "@/store/loanStore";

export const useLoan = () => {
  const {
    setLoanForm,
    setLoanResult,
    setHistory,
  } = useLoanStore();

  const submitLoan = async (
    payload: LoanApplicationPayload
  ) => {
    setLoanForm(payload);

    const result =
      await applyLoan(payload);

    setLoanResult(result);

    return result;
  };

  const fetchHistory = async (
    userId: string
  ) => {
    const history =
      await getLoanHistory(
        userId
      );

    setHistory(history);

    return history;
  };

  const explainDecision =
    async (
      payload: LoanApplicationPayload
    ) => {
      const explanation =
        await explainLoanDecision(
          payload
        );

      return explanation;
    };

  return {
    submitLoan,
    fetchHistory,
    explainDecision,
  };
};