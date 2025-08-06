from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for frontend access (Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change this to your Vercel URL for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to PredLoop Backend API!"}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()

    # Extract frontend inputs (optional for debugging)
    crypto = data.get("crypto")
    model = data.get("model")
    timeframe = data.get("timeframe")
    indicators = data.get("indicators", [])

    # Dummy ML output (replace this with real prediction logic later)
    return {
        "predicted_price": 28347.15,
        "trend": "Uptrend",
        "confidence": 92.7
    }
