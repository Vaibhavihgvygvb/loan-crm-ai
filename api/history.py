from fastapi import APIRouter
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import LoanApplication

router = APIRouter(
    prefix="/history",
    tags=["Loan History"]
)

@router.get("/{user_id}")
def get_user_history(user_id: int):
    db: Session = SessionLocal()

    applications = db.query(
        LoanApplication
    ).filter(
        LoanApplication.user_id == user_id
    ).all()

    result = []

    for app in applications:
        result.append({
            "id": app.id,
            "approval_prediction":
                app.approval_prediction,
            "fraud_prediction":
                app.fraud_prediction,
            "recommended_loan_amount":
                app.recommended_loan_amount
        })

    return {
        "applications": result
    }