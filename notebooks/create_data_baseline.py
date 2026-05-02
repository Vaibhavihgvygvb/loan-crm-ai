import pandas as pd
import json

# Load training dataset
df = pd.read_csv(
    "data/realistic_loan_data.csv"
)

baseline = {}

for column in df.columns:
    if df[column].dtype != "object":
        baseline[column] = {
            "mean": float(df[column].mean()),
            "std": float(df[column].std()),
            "min": float(df[column].min()),
            "max": float(df[column].max())
        }

# Save baseline
with open(
    "models/data_baseline.json",
    "w"
) as f:
    json.dump(
        baseline,
        f,
        indent=4
    )

print(
    "Baseline profile created successfully."
)