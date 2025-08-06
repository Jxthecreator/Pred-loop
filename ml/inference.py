
import joblib
import numpy as np
import pandas as pd
from backend.services.data_fetcher import fetch_ohlcv
from backend.utils.indicators import add_indicators
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model

def predict_price(coin: str, model: str):
    df = fetch_ohlcv(symbol=f"{coin.replace('USDT', '')}/USDT")
    df = add_indicators(df).dropna()

    if model == "xgboost":
        features = ["open", "high", "low", "volume", "rsi", "macd", "macd_signal", "bb_upper", "bb_lower"]
        X_latest = df[features].iloc[-1:]
        model = joblib.load("backend/ml/models/xgboost_model.pkl")
        pred = model.predict(X_latest)[0]
        return [{"date": pd.Timestamp.now().strftime("%Y-%m-%d"), "value": float(pred)}]

    elif model == "lstm":
        data = df["close"].values.reshape(-1, 1)
        scaler = MinMaxScaler()
        data_scaled = scaler.fit_transform(data)
        look_back = 10
        latest_seq = data_scaled[-look_back:]
        latest_seq = latest_seq.reshape((1, look_back, 1))
        model = load_model("backend/ml/models/lstm_model.h5")
        pred_scaled = model.predict(latest_seq)[0][0]
        pred = scaler.inverse_transform([[pred_scaled]])[0][0]
        return [{"date": pd.Timestamp.now().strftime("%Y-%m-%d"), "value": float(pred)}]

    else:
        return [{"date": "TBD", "value": 0}]
