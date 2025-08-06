
from fastapi import APIRouter, Query
from backend.ml.inference import predict_price

router = APIRouter()

@router.get("/predict")
async def predict(coin: str = Query(...), model: str = Query(...)):
    prediction = predict_price(coin, model)
    return {"coin": coin, "model": model, "prediction": prediction}
