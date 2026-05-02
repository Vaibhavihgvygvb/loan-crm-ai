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

# Fraud features
X = df[
    [
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
]

# Target
y = df["fraud_flag"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model
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

# Metrics
accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nFraud Model Accuracy:")
print(accuracy)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred
    )
)

# Save
joblib.dump(
    model,
    "models/xgboost_fraud_model.pkl"
)

print(
    "\nFraud model saved successfully."
)