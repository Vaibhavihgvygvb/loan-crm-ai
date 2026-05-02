import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

st.title("Loan CRM Intelligence Dashboard")

module = st.sidebar.selectbox(
    "Select Module",
    ["Loan Approval", "Fraud Detection", "Loan Recommendation"]
)


# Loan Approval Module
if module == "Loan Approval":
    st.header("Loan Approval Prediction")

    gender = st.number_input("Gender (0/1)")
    married = st.number_input("Married (0/1)")
    dependents = st.number_input("Dependents")
    education = st.number_input("Education (0/1)")
    self_employed = st.number_input("Self Employed (0/1)")
    applicant_income = st.number_input("Applicant Income")
    coapplicant_income = st.number_input("Coapplicant Income")
    loan_amount = st.number_input("Loan Amount")
    loan_term = st.number_input("Loan Term")
    credit_history = st.number_input("Credit History")
    property_area = st.number_input("Property Area")

    if st.button("Predict Approval"):
        values = [
            gender,
            married,
            dependents,
            education,
            self_employed,
            applicant_income,
            coapplicant_income,
            loan_amount,
            loan_term,
            credit_history,
            property_area
        ]

        response = requests.post(
            f"{API_URL}/predict-approval",
            json={"values": values}
        )

        st.success(response.json())


# Fraud Detection Module
elif module == "Fraud Detection":
    st.header("Fraud Detection")

    transaction_id = st.number_input("Transaction ID")
    amount = st.number_input("Amount")
    transaction_hour = st.number_input("Transaction Hour")
    merchant_category = st.number_input("Merchant Category")
    foreign_transaction = st.number_input("Foreign Transaction")
    location_mismatch = st.number_input("Location Mismatch")
    device_trust_score = st.number_input("Device Trust Score")
    velocity_last_24h = st.number_input("Velocity Last 24h")
    cardholder_age = st.number_input("Cardholder Age")

    if st.button("Predict Fraud"):
        values = [
            transaction_id,
            amount,
            transaction_hour,
            merchant_category,
            foreign_transaction,
            location_mismatch,
            device_trust_score,
            velocity_last_24h,
            cardholder_age
        ]

        response = requests.post(
            f"{API_URL}/predict-fraud",
            json={"values": values}
        )

        st.success(response.json())


# Loan Recommendation Module
elif module == "Loan Recommendation":
    st.header("Loan Recommendation")

    monthly_income = st.number_input("Monthly Income")
    existing_emi = st.number_input("Existing EMI")
    credit_score = st.number_input("Credit Score")
    employment_years = st.number_input("Employment Years")
    relationship_years = st.number_input("Relationship Years")
    avg_bank_balance = st.number_input("Average Bank Balance")
    collateral_value = st.number_input("Collateral Value")
    fraud_risk_score = st.number_input("Fraud Risk Score")
    bank_policy_multiplier = st.number_input("Bank Policy Multiplier")

    if st.button("Recommend Loan"):
        values = [
            monthly_income,
            existing_emi,
            credit_score,
            employment_years,
            relationship_years,
            avg_bank_balance,
            collateral_value,
            fraud_risk_score,
            bank_policy_multiplier
        ]

        response = requests.post(
            f"{API_URL}/recommend-loan",
            json={"values": values}
        )

        st.success(response.json())