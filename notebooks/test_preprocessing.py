import sys
import os
import pandas as pd

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.preprocessing import preprocess_loan_data

df = pd.read_csv("data/loan_fraud_data.csv")

processed_df, encoders = preprocess_loan_data(df)

print(processed_df.head())
print(processed_df.isnull().sum())