
import pandas as pd
import joblib
from backend.services.data_fetcher import fetch_ohlcv
from backend.utils.indicators import add_indicators
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import xgboost as xgb
import os

def train_model():
    df = fetch_ohlcv()
    df = add_indicators(df).dropna()

    # Feature engineering
    features = ["open", "high", "low", "volume", "rsi", "macd", "macd_signal", "bb_upper", "bb_lower"]
    target = "close"

    X = df[features]
    y = df[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    model = xgb.XGBRegressor(objective="reg:squarederror", n_estimators=100)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)
    rmse = mean_squared_error(y_test, preds, squared=False)
    print(f"XGBoost RMSE: {rmse:.2f}")

    os.makedirs("backend/ml/models", exist_ok=True)
    joblib.dump(model, "backend/ml/models/xgboost_model.pkl")

if __name__ == "__main__":
    train_model()
