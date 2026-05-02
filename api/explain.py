from fastapi import APIRouter
import joblib
import shap
import pandas as pd

router = APIRouter(
    prefix="/explain",
    tags=["Explainability"]
)

# Load new XGBoost approval model
approval_model = joblib.load(
    "models/xgboost_approval_model.pkl"
)

# TreeExplainer for XGBoost
explainer = shap.TreeExplainer(
    approval_model
)

@router.post("/loan-approval")
def explain_loan_approval(
    payload: dict
):
    # Remove user_id if present
    payload.pop("user_id", None)

    # Create dataframe
    input_data = pd.DataFrame(
        [payload]
    )

    # Generate SHAP values
    shap_values = explainer.shap_values(
        input_data
    )

    feature_impact = {}

    for i, column in enumerate(
        input_data.columns
    ):
        feature_impact[column] = float(
            shap_values[0][i]
        )

    return {
        "feature_impact": feature_impact
    }