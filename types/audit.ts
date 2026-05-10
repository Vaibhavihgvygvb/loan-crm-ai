export interface AuditLog {
  user_id: string;
  approval_prediction: boolean;
  fraud_prediction: boolean;
  recommended_loan_amount: number;
  timestamp: string;
}