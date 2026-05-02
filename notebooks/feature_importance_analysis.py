import joblib
import pandas as pd

# Load models
approval_model = joblib.load(
    "models/xgboost_approval_model.pkl"
)

fraud_model = joblib.load(
    "models/xgboost_fraud_model.pkl"
)

loan_model = joblib.load(
    "models/xgboost_loan_amount_model.pkl"
)

# Feature names

approval_features = [
    "monthly_income",
    "existing_emi",
    "credit_score",
    "employment_years",
    "relationship_years",
    "avg_bank_balance",
    "collateral_value",
    "debt_to_income_ratio",
    "savings_ratio",
    "late_payment_count",
    "job_stability_score",
    "account_activity_score",
    "transaction_consistency",
]

fraud_features = [
    "fraud_risk_score",
    "geo_risk_score",
    "device_risk_score",
    "fraud_velocity_score",
    "bounced_emi_count",
    "transaction_consistency",
    "credit_card_utilization",
    "late_payment_count",
    "account_activity_score",
]

loan_features = [
    "monthly_income",
    "existing_emi",
    "credit_score",
    "avg_bank_balance",
    "collateral_value",
    "debt_to_income_ratio",
    "savings_ratio",
    "employment_years",
    "relationship_years",
    "job_stability_score",
]

# Approval importance
approval_importance = pd.DataFrame({
    "feature": approval_features,
    "importance": approval_model.feature_importances_
}).sort_values(
    by="importance",
    ascending=False
)

print("\nApproval Model Feature Importance:")
print(approval_importance)

# Fraud importance
fraud_importance = pd.DataFrame({
    "feature": fraud_features,
    "importance": fraud_model.feature_importances_
}).sort_values(
    by="importance",
    ascending=False
)

print("\nFraud Model Feature Importance:")
print(fraud_importance)

# Loan model importance
loan_importance = pd.DataFrame({
    "feature": loan_features,
    "importance": loan_model.feature_importances_
}).sort_values(
    by="importance",
    ascending=False
)

print("\nLoan Recommendation Feature Importance:")
print(loan_importance)