import pandas as pd
import numpy as np

np.random.seed(42)

ROWS = 200000

data = pd.DataFrame()

# Identity
data["user_id"] = np.arange(1, ROWS + 1)

# Financial (realistic distributions)
data["monthly_income"] = np.random.lognormal(
    mean=11,
    sigma=0.5,
    size=ROWS
)

data["existing_emi"] = (
    data["monthly_income"]
    * np.random.uniform(0.05, 0.4, ROWS)
)

data["avg_bank_balance"] = (
    data["monthly_income"]
    * np.random.uniform(1, 8, ROWS)
)

data["collateral_value"] = (
    data["monthly_income"]
    * np.random.uniform(5, 20, ROWS)
)

# Credit
data["credit_score"] = np.random.normal(
    700,
    80,
    ROWS
).clip(300, 900)

data["credit_card_utilization"] = np.random.uniform(
    0.1,
    0.95,
    ROWS
)

data["late_payment_count"] = np.random.poisson(
    2,
    ROWS
)

# Employment
data["employment_years"] = np.random.randint(
    0,
    30,
    ROWS
)

data["job_stability_score"] = np.random.uniform(
    0.4,
    1.0,
    ROWS
)

# Relationship
data["relationship_years"] = np.random.randint(
    0,
    20,
    ROWS
)

data["tenure_with_bank"] = np.random.randint(
    1,
    15,
    ROWS
)

data["products_owned"] = np.random.randint(
    1,
    8,
    ROWS
)

# Derived financial ratios
data["debt_to_income_ratio"] = (
    data["existing_emi"]
    / data["monthly_income"]
)

data["savings_ratio"] = (
    data["avg_bank_balance"]
    / data["monthly_income"]
)

data["avg_monthly_spend"] = (
    data["monthly_income"]
    * np.random.uniform(0.3, 0.9, ROWS)
)

data["loan_utilization_ratio"] = np.random.uniform(
    0.1,
    1.0,
    ROWS
)

# Fraud Risk
data["fraud_risk_score"] = np.random.uniform(
    0,
    1,
    ROWS
)

data["geo_risk_score"] = np.random.uniform(
    0,
    1,
    ROWS
)

data["device_risk_score"] = np.random.uniform(
    0,
    1,
    ROWS
)

data["fraud_velocity_score"] = np.random.uniform(
    0,
    1,
    ROWS
)

# Behavioral
data["account_activity_score"] = np.random.uniform(
    0.2,
    1,
    ROWS
)

data["bounced_emi_count"] = np.random.poisson(
    1,
    ROWS
)

data["transaction_consistency"] = np.random.uniform(
    0.4,
    1,
    ROWS
)

# Targets

# Approval logic
approval_score = (
    (data["credit_score"] * 0.35)
    + (data["job_stability_score"] * 200)
    + (data["account_activity_score"] * 150)
    + (data["savings_ratio"] * 20)
    - (data["debt_to_income_ratio"] * 300)
    - (data["late_payment_count"] * 20)
)

threshold = np.percentile(
    approval_score,
    65
)

data["loan_approved"] = (
    approval_score > threshold
).astype(int)

# Fraud logic (imbalanced)
fraud_score = (
    data["fraud_risk_score"]
    + data["geo_risk_score"]
    + data["device_risk_score"]
    + data["fraud_velocity_score"]
)

data["fraud_flag"] = (
    fraud_score > 3.2
).astype(int)

# Loan recommendation
(
    data["monthly_income"] * 6
    + data["collateral_value"] * 0.8
    + data["avg_bank_balance"] * 0.5
)

# Loan recommendation target
data["recommended_loan_amount"] = (
    (data["monthly_income"] * 5)
    + (data["collateral_value"] * 0.4)
    + (data["avg_bank_balance"] * 0.4)
)

data.to_csv(
    "data/realistic_loan_data.csv",
    index=False
)

print("Dataset generated successfully.")
print(data.shape)