from fastapi import APIRouter
import joblib

router = APIRouter(
    prefix="/forecast",
    tags=["Forecasting"]
)

forecast_model = joblib.load(
    "models/arima_loan_forecast.pkl"
)

@router.get("/loan-demand")
def loan_demand_forecast():
    forecast = forecast_model.forecast(steps=3)

    return {
        "status": "success",
        "forecast_next_3_months": forecast.tolist()
    }