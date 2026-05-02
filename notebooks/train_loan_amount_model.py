import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from xgboost import XGBRegressor

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
        "avg_bank_balance",
        "collateral_value",
        "debt_to_income_ratio",
        "savings_ratio",
        "employment_years",
        "relationship_years",
        "job_stability_score",
    ]
]

# Target
y = df["recommended_loan_amount"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
model = XGBRegressor(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.05,
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Metrics
mae = mean_absolute_error(
    y_test,
    y_pred
)

rmse = mean_squared_error(
    y_test,
    y_pred
) ** 0.5

print("\nLoan Recommendation MAE:")
print(mae)

print("\nLoan Recommendation RMSE:")
print(rmse)

# Save
joblib.dump(
    model,
    "models/xgboost_loan_amount_model.pkl"
)

print(
    "\nLoan recommendation model saved successfully."
)