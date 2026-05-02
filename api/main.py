from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.rm_dashboard import router as rm_router
from api.auth import router as auth_router
from api.loan import router as loan_router
from api.forecast import router as forecast_router
from api.explain import router as explain_router
from api.history import router as history_router
from api.rm_customers import router as rm_customers_router
from api.drift import router as drift_router
from api.audit import router as audit_router
from api.database import engine
from api.models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Loan CRM Intelligence API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(drift_router)
app.include_router(history_router)
app.include_router(explain_router)
app.include_router(auth_router)
app.include_router(loan_router)
app.include_router(forecast_router)
app.include_router(rm_router)
app.include_router(rm_customers_router)
app.include_router(audit_router)

@app.get("/")
def root():
    return {
        "message": "Loan CRM Intelligence API Running"
    }