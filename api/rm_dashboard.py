from fastapi import APIRouter
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import LoanApplication
from sqlalchemy import func
import joblib

router = APIRouter(
    prefix="/rm",
    tags=["RM Dashboard"]
)

forecast_model = joblib.load(
    "models/arima_loan_forecast.pkl"
)

@router.get("/dashboard")
def rm_dashboard():
    db: Session = SessionLocal()

    total_applications = db.query(
        LoanApplication
    ).count()

    approved_loans = db.query(
        LoanApplication
    ).filter(
        LoanApplication.approval_prediction == 1
    ).count()

    fraud_cases = db.query(
        LoanApplication
    ).filter(
        LoanApplication.fraud_prediction == 1
    ).count()

    avg_loan_amount = db.query(
        func.avg(
            LoanApplication.recommended_loan_amount
        )
    ).scalar()

    forecast = forecast_model.forecast(
        steps=3
    )

    return {
        "total_applications": total_applications,
        "approved_loans": approved_loans,
        "fraud_cases": fraud_cases,
        "average_recommended_loan": avg_loan_amount,
        "loan_demand_forecast": forecast.tolist()
    }