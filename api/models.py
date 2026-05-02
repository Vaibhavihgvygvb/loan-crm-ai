from sqlalchemy import Column, Integer, String, Float, String, DateTime
from api.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)



class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    monthly_income = Column(Float)
    existing_emi = Column(Float)
    credit_score = Column(Float)
    employment_years = Column(Float)
    relationship_years = Column(Float)
    avg_bank_balance = Column(Float)
    collateral_value = Column(Float)

    approval_prediction = Column(Integer)
    fraud_prediction = Column(Integer)
    recommended_loan_amount = Column(Float)




from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime
from datetime import datetime


class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer
    )

    approval_prediction = Column(
        Integer
    )

    fraud_prediction = Column(
        Integer
    )

    recommended_loan_amount = Column(
        Float
    )

    drift_status = Column(
        String
    )

    model_version = Column(
        String
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )