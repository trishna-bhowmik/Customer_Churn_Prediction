from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

ROOT = os.path.dirname(__file__)
MODEL_PATH = os.path.join(ROOT, "models", "churn_pipeline.pkl")
model = joblib.load(MODEL_PATH)

@app.get("/health")
def health():
    return jsonify({"status": "ok"})

@app.post("/predict")
def predict():
    try:
        payload = request.get_json(force=True)
        df = pd.DataFrame([payload])
        pred = model.predict(df)[0]
        prob = float(model.predict_proba(df)[0, 1])
        return jsonify({"churn": int(pred), "churn_probability": round(prob, 4)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    
    app.run(debug=True)
