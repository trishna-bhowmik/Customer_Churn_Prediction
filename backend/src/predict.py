import os
import joblib
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(ROOT, "models", "churn_pipeline.pkl")

def predict_one(example: dict):
    model = joblib.load(MODEL_PATH)
    df = pd.DataFrame([example])
    pred = model.predict(df)[0]
    prob = float(model.predict_proba(df)[0, 1])
    return pred, prob

if __name__ == "__main__":
    sample = {
        "gender": "Female",
        "SeniorCitizen": 0,
        "Partner": "Yes",
        "Dependents": "No",
        "tenure": 12,
        "PhoneService": "Yes",
        "MultipleLines": "No",
        "InternetService": "Fiber optic",
        "OnlineSecurity": "No",
        "OnlineBackup": "Yes",
        "DeviceProtection": "No",
        "TechSupport": "No",
        "StreamingTV": "Yes",
        "StreamingMovies": "Yes",
        "Contract": "Month-to-month",
        "PaperlessBilling": "Yes",
        "PaymentMethod": "Electronic check",
        "MonthlyCharges": 70.35,
        "TotalCharges": 845.5,
    }
    p, pr = predict_one(sample)
    print({"churn": int(p), "probability": round(pr, 3)})
