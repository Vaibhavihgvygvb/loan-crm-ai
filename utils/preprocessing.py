import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder


def preprocess_loan_data(df):
    df = df.copy()

    categorical_cols = df.select_dtypes(include=['object']).columns
    numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns

    # Missing value handling
    for col in categorical_cols:
        df[col] = df[col].fillna(df[col].mode()[0])

    for col in numerical_cols:
        df[col] = df[col].fillna(df[col].median())

    # Label encoding
    label_encoders = {}

    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le

    return df, label_encoders