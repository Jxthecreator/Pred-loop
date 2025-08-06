
import numpy as np
import pandas as pd
from backend.services.data_fetcher import fetch_ohlcv
from backend.utils.indicators import add_indicators
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import os

def create_dataset(data, look_back=10):
    X, y = [], []
    for i in range(len(data) - look_back):
        X.append(data[i:i+look_back])
        y.append(data[i+look_back])
    return np.array(X), np.array(y)

def train_lstm_model():
    df = fetch_ohlcv()
    df = add_indicators(df).dropna()
    data = df["close"].values.reshape(-1, 1)

    scaler = MinMaxScaler()
    data_scaled = scaler.fit_transform(data)

    X, y = create_dataset(data_scaled, 10)
    X = X.reshape((X.shape[0], X.shape[1], 1))

    model = Sequential([
        LSTM(50, return_sequences=False, input_shape=(10, 1)),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=10, batch_size=8)

    os.makedirs("backend/ml/models", exist_ok=True)
    model.save("backend/ml/models/lstm_model.h5")
    print("LSTM model trained and saved.")

if __name__ == "__main__":
    train_lstm_model()
