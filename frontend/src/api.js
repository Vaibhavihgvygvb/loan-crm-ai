export const API_BASE =
  "https://vaibhav991-loan-crm-ai.hf.space";

export async function api(
  endpoint,
  options = {}
) {
  try {
    const response = await fetch(
      `${API_BASE}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail ||
          data.message ||
          `Request failed: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const loanFields = [
  {
    key: "monthly_income",
    label: "Monthly Income",
    placeholder: "85000",
    unit: "₹",
  },
  {
    key: "existing_emi",
    label: "Existing EMI",
    placeholder: "12000",
    unit: "₹",
  },
  {
    key: "credit_score",
    label: "Credit Score",
    placeholder: "300-900",
    unit: "",
  },
  {
    key: "employment_years",
    label: "Employment Years",
    placeholder: "5",
    unit: "yrs",
  },
  {
    key: "relationship_years",
    label: "Relationship Years",
    placeholder: "3",
    unit: "yrs",
  },
  {
    key: "avg_bank_balance",
    label: "Avg Bank Balance",
    placeholder: "250000",
    unit: "₹",
  },
  {
    key: "collateral_value",
    label: "Collateral Value",
    placeholder: "1500000",
    unit: "₹",
  },
  {
    key: "fraud_risk_score",
    label: "Fraud Risk Score",
    placeholder: "0.0 - 1.0",
    unit: "",
  },
  {
    key: "bank_policy_multiplier",
    label: "Bank Policy Multiplier",
    placeholder: "1.2",
    unit: "x",
  },
];

export function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  )
    return "—";

  const v = Number(value);

  if (v >= 10000000)
    return `₹${(v / 10000000).toFixed(2)} Cr`;

  if (v >= 100000)
    return `₹${(v / 100000).toFixed(2)} L`;

  if (v >= 1000)
    return `₹${(v / 1000).toFixed(1)}K`;

  return `₹${Math.round(v)}`;
}

export function formatNumber(value) {
  if (
    value === null ||
    value === undefined
  )
    return "—";

  return new Intl.NumberFormat(
    "en-IN"
  ).format(Math.round(value));
}