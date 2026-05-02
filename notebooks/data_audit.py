import pandas as pd
import os

# Project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Data directory
DATA_PATH = os.path.join(BASE_DIR, "data")

files = [
    "loan_data.csv",
    "crm_data.csv",
    "loan_fraud_data.csv",
    "credit_card_fraud_data.csv"
]

for file in files:
    print("\n" + "=" * 50)
    print(f"DATASET: {file}")
    print("=" * 50)

    file_path = os.path.join(DATA_PATH, file)

    print(f"Reading file from: {file_path}")

    df = pd.read_csv(file_path)

    print("\nShape:")
    print(df.shape)

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nMissing Values:")
    print(df.isnull().sum())

    print("\nData Types:")
    print(df.dtypes)

    print("\nSample Data:")
    print(df.head())