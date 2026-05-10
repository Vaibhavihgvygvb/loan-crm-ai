import { Customer } from "@/types/customer";

interface CustomerCardProps {
  customer: Customer;
}

export default function CustomerCard({
  customer,
}: CustomerCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold text-lg">
        {customer.name}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {customer.email}
      </p>

      <div className="mt-4 space-y-2">
        <p>
          Credit Score:
          {" "}
          {customer.credit_score}
        </p>

        <p>
          Loan Amount:
          {" "}
          ₹{customer.loan_amount}
        </p>

        <p>
          Status:
          {" "}
          {customer.loan_status}
        </p>
      </div>
    </div>
  );
}