import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

TELCO_CATEGORICAL = [
    "gender",
    "Partner",
    "Dependents",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
]
TELCO_NUMERIC = ["SeniorCitizen", "tenure", "MonthlyCharges", "TotalCharges"]

ALL_FEATURES = TELCO_CATEGORICAL + TELCO_NUMERIC

def load_telco(csv_path: str) -> pd.DataFrame:
    """Load Kaggle Telco Churn dataset, clean key fields, and drop extra columns."""
    df = pd.read_csv(csv_path)
    
    if "customerID" in df.columns:
        df = df.drop(columns=["customerID"])
    
    if "TotalCharges" in df.columns:
        df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")
    
    num_cols = ["tenure", "MonthlyCharges", "TotalCharges"]
    for c in num_cols:
        if c in df.columns:
            df[c] = df[c].fillna(0)
    
    if "Churn" in df.columns:
        df["Churn"] = df["Churn"].map({"Yes": 1, "No": 0})
    return df

def build_preprocessor(feature_frame: pd.DataFrame) -> ColumnTransformer:
    """Build a ColumnTransformer that scales numeric and one-hot-encodes categorical."""
    categorical = [c for c in TELCO_CATEGORICAL if c in feature_frame.columns]
    numeric = [c for c in TELCO_NUMERIC if c in feature_frame.columns]
    pre = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numeric),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
        ],
        remainder="drop",
        n_jobs=None,
    )
    return pre
