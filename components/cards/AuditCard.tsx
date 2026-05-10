import { AuditLog } from "@/types/audit";
import {
  formatCurrency,
  formatDate,
} from "@/utils/format";

interface AuditCardProps {
  audit: AuditLog;
}

export default function AuditCard({
  audit,
}: AuditCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <p>
        User:
        {" "}
        {audit.user_id}
      </p>

      <p>
        Approval:
        {" "}
        {audit.approval_prediction
          ? "Approved"
          : "Rejected"}
      </p>

      <p>
        Fraud:
        {" "}
        {audit.fraud_prediction
          ? "Risk"
          : "Safe"}
      </p>

      <p>
        Amount:
        {" "}
        {
          formatCurrency(
            audit.recommended_loan_amount
          )
        }
      </p>

      <p className="text-xs text-slate-400 mt-3">
        {
          formatDate(
            audit.timestamp
          )
        }
      </p>
    </div>
  );
}