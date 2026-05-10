import { formatCurrency } from "@/utils/format";

interface LoanResultCardProps {
  result: {
    approval_prediction: boolean;
    fraud_prediction: boolean;
    recommended_loan_amount: number;
  };
}

export default function LoanResultCard({
  result,
}: LoanResultCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">
        Loan Decision
      </h2>

      <p>
        Approval:
        {" "}
        {result.approval_prediction
          ? "Approved"
          : "Rejected"}
      </p>

      <p>
        Fraud Risk:
        {" "}
        {result.fraud_prediction
          ? "High"
          : "Safe"}
      </p>

      <p>
        Recommended Amount:
        {" "}
        {
          formatCurrency(
            result.recommended_loan_amount
          )
        }
      </p>
    </div>
  );
}