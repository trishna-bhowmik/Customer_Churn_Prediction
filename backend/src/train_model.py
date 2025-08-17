import os
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

from data_preprocessing import load_telco, build_preprocessor, ALL_FEATURES

ROOT = os.path.dirname(os.path.dirname(__file__))
DATA_PATH = os.path.join(ROOT, "data", "telco_churn.csv")
MODEL_PATH = os.path.join(ROOT, "models", "churn_pipeline.pkl")

def main():
   
    df = load_telco(DATA_PATH)

   
    needed = [c for c in ALL_FEATURES if c in df.columns]
    if "Churn" not in df.columns:
        raise ValueError("CSV missing target column 'Churn'.")
    X = df[needed].copy()
    y = df["Churn"].astype(int)

    
    pre = build_preprocessor(X)
    model = Pipeline(
        steps=[
            ("preprocessor", pre),
            ("classifier", LogisticRegression(max_iter=2000)),
        ]
    )

  
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    model.fit(X_train, y_train)

    
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    print("Classification report:")
    print(classification_report(y_test, y_pred, digits=4))
    print("ROC AUC:", round(roc_auc_score(y_test, y_prob), 4))

    
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    print(f"✅ Saved model to {MODEL_PATH}")

if __name__ == "__main__":
    main()
