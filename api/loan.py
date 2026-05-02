from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import LoanApplication, PredictionLog
import joblib

router = APIRouter()

# Load upgraded models
approval_model = joblib.load(
    "models/xgboost_approval_model.pkl"
)

fraud_model = joblib.load(
    "models/xgboost_fraud_model.pkl"
)

loan_amount_model = joblib.load(
    "models/xgboost_loan_amount_model.pkl"
)


class LoanRequest(BaseModel):
    user_id: int
    monthly_income: float
    existing_emi: float
    credit_score: float
    employment_years: float
    relationship_years: float
    avg_bank_balance: float
    collateral_value: float
    debt_to_income_ratio: float
    savings_ratio: float
    job_stability_score: float
    fraud_risk_score: float


@router.post("/apply-loan")
def apply_loan(data: LoanRequest):
    db: Session = SessionLocal()

    # Loan recommendation model input
    loan_input = [[
        data.monthly_income,
        data.existing_emi,
        data.credit_score,
        data.avg_bank_balance,
        data.collateral_value,
        data.debt_to_income_ratio,
        data.savings_ratio,
        data.employment_years,
        data.relationship_years,
        data.job_stability_score
    ]]

    # Predict recommended loan amount
    recommended_amount = loan_amount_model.predict(
        loan_input
    )[0]

    # Approval model input
    approval_input = [[
        data.monthly_income,
        data.existing_emi,
        data.credit_score,
        data.employment_years,
        data.relationship_years,
        data.avg_bank_balance,
        data.collateral_value,
        data.debt_to_income_ratio,
        data.savings_ratio,
        0,  # late_payment_count placeholder
        data.job_stability_score,
        0.8,  # account_activity_score placeholder
        0.85  # transaction_consistency placeholder
    ]]

    approval_prediction = int(
        approval_model.predict(
            approval_input
        )[0]
    )

    # Fraud model input
    fraud_input = [[
        data.fraud_risk_score,
        0.5,   # geo_risk_score placeholder
        0.5,   # device_risk_score placeholder
        0.5,   # fraud_velocity_score placeholder
        0,     # bounced_emi_count placeholder
        0.85,  # transaction_consistency placeholder
        0.3,   # credit_card_utilization placeholder
        0,     # late_payment_count placeholder
        0.8    # account_activity_score placeholder
    ]]

    fraud_prediction = int(
        fraud_model.predict(
            fraud_input
        )[0]
    )

    # Save to DB
    loan_application = LoanApplication(
        user_id=data.user_id,
        monthly_income=data.monthly_income,
        existing_emi=data.existing_emi,
        credit_score=data.credit_score,
        employment_years=data.employment_years,
        relationship_years=data.relationship_years,
        avg_bank_balance=data.avg_bank_balance,
        collateral_value=data.collateral_value,
        approval_prediction=approval_prediction,
        fraud_prediction=fraud_prediction,
        recommended_loan_amount=float(recommended_amount)
    )
    prediction_log = PredictionLog(
        user_id=data.user_id,
        approval_prediction=approval_prediction,
        fraud_prediction=fraud_prediction,
        recommended_loan_amount=float(
        recommended_amount
    ),
    drift_status="not_checked",
    model_version="xgboost_v2"
)

    db.add(loan_application)
    db.add(prediction_log)
    db.commit()

    return {
        "approval_prediction": approval_prediction,
        "fraud_prediction": fraud_prediction,
        "recommended_loan_amount": float(recommended_amount)
    }