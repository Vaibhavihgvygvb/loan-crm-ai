import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from xgboost import XGBClassifier

# Load realistic dataset
df = pd.read_csv(
    "data/realistic_loan_data.csv"
)

# Features
X = df[
    [
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
]

# Target
y = df["loan_approved"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# XGBoost model
model = XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nXGBoost Accuracy:")
print(accuracy)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred
    )
)

# Save model
joblib.dump(
    model,
    "models/xgboost_approval_model.pkl"
)

print(
    "\nModel saved successfully."
)