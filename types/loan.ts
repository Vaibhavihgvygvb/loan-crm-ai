export interface LoanApplicationPayload {
  monthly_income: number;
  existing_emi: number;
  credit_score: number;
  employment_years: number;
  relationship_years: number;
  avg_bank_balance: number;
  collateral_value: number;
  fraud_risk_score: number;
  bank_policy_multiplier: number;
}

export interface LoanDecisionResponse {
  approval_prediction: boolean;
  fraud_prediction: boolean;
  recommended_loan_amount: number;
}

export interface LoanHistoryItem {
  id: string;
  timestamp: string;
  approval_prediction: boolean;
  fraud_prediction: boolean;
  recommended_loan_amount: number;
}