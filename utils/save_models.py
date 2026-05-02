import joblib
import os


def save_model(model, filename):
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, f"models/{filename}")
    print(f"Saved: models/{filename}")