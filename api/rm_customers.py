from fastapi import APIRouter
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import LoanApplication, User

router = APIRouter(
    prefix="/rm/customers",
    tags=["RM Customers"]
)

@router.get("/")
def get_customer_applications():
    db: Session = SessionLocal()

    applications = db.query(
        LoanApplication
    ).all()

    result = []

    for app in applications:
        user = db.query(User).filter(
            User.id == app.user_id
        ).first()

        result.append({
            "customer_name": user.name,
            "customer_email": user.email,
            "approval_prediction":
                app.approval_prediction,
            "fraud_prediction":
                app.fraud_prediction,
            "recommended_loan_amount":
                app.recommended_loan_amount
        })

    return {
        "customers": result
    }