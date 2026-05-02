from fastapi import APIRouter
import json

router = APIRouter(
    prefix="/drift",
    tags=["Model Monitoring"]
)

# Load baseline
with open(
    "models/data_baseline.json"
) as f:
    baseline = json.load(f)

@router.post("/check")
def check_drift(
    payload: dict
):
    drift_report = {}

    for key, value in payload.items():
        if key in baseline:
            mean = baseline[key]["mean"]
            std = baseline[key]["std"]

            z_score = abs(
                (value - mean) / std
            )

            drift_report[key] = {
                "z_score": z_score,
                "drift_detected": z_score > 3
            }

    return {
        "drift_report": drift_report
    }