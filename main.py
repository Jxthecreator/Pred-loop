from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Allow frontend apps (like Vercel) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Pred-Loop API 👋"}

@app.post("/predict")
async def predict(request: Request):
    try:
        data = await request.json()

        # Extract user input
        crypto = data.get("cryptocurrency", "BTC/USDT")
        model = data.get("model", "LSTM")
        timeframe = data.get("timeframe", "1 Hour")
        indicators = data.get("indicators", {})

        rsi = indicators.get("rsi", False)
        macd = indicators.get("macd", False)
        bb = indicators.get("bollinger_bands", False)

        # Logging input (for debug)
        print(f"Received Prediction Request:\n"
              f"Crypto: {crypto}, Model: {model}, Timeframe: {timeframe}, "
              f"RSI: {rsi}, MACD: {macd}, BB: {bb}")

        # TODO: Replace with actual ML logic
        mock_result = {
            "prediction": "Bullish 📈" if rsi or macd or bb else "Neutral 🤷‍♂️"
        }

        return JSONResponse(content=mock_result)

    except Exception as e:
        print("Prediction error:", str(e))
        return JSONResponse(status_code=500, content={"error": "Server error. Check backend logs."})
