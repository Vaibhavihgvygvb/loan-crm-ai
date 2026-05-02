import pandas as pd
import random

data = []

NUM_RECORDS = 100000

for _ in range(NUM_RECORDS):
    monthly_income = random.randint(150000, 2000000)
    existing_emi = random.randint(5000, 100000)
    credit_score = random.randint(300, 900)
    employment_years = random.randint(0, 25)
    relationship_years = random.randint(0, 20)
    avg_bank_balance = random.randint(5000, 2000000)
    collateral_value = random.randint(0, 3000000)
    fraud_risk_score = round(
        random.uniform(0.0, 1.0), 2
    )
    bank_policy_multiplier = round(
        random.uniform(0.7, 1.5), 2
    )

    approval_score = 0

    if credit_score >= 700:
        approval_score += 1

    if monthly_income >= 500000:
        approval_score += 1

    if existing_emi <= 30000:
        approval_score += 1

    if avg_bank_balance >= 100000:
        approval_score += 1

    if collateral_value >= 200000:
        approval_score += 1

    if fraud_risk_score <= 0.4:
        approval_score += 1

    approved = 1 if approval_score >= 4 else 0

    data.append([
        monthly_income,
        existing_emi,
        credit_score,
        employment_years,
        relationship_years,
        avg_bank_balance,
        collateral_value,
        fraud_risk_score,
        bank_policy_multiplier,
        approved
    ])

df = pd.DataFrame(
    data,
    columns=[
        "monthly_income",
        "existing_emi",
        "credit_score",
        "employment_years",
        "relationship_years",
        "avg_bank_balance",
        "collateral_value",
        "fraud_risk_score",
        "bank_policy_multiplier",
        "approved"
    ]
)

df.to_csv(
    "data/loan_approval_production.csv",
    index=False
)

print(f"{NUM_RECORDS} records created successfully")