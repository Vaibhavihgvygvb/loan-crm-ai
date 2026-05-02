from fastapi import APIRouter
from sqlalchemy.orm import Session
from api.database import SessionLocal
from api.models import PredictionLog

router = APIRouter(
    prefix="/audit",
    tags=["Audit Trail"]
)


@router.get("/logs")
def get_prediction_logs():
    db: Session = SessionLocal()

    logs = db.query(
        PredictionLog
    ).all()

    return logs