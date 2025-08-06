
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from backend.api.endpoints import predict

app = FastAPI()
app.include_router(predict.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.websocket("/ws/BTCUSDT")
async def btc_ws(websocket: WebSocket):
    await websocket.accept()
    import asyncio, random
    while True:
        await asyncio.sleep(2)
        mock_price = 34000 + random.randint(-200, 200)
        await websocket.send_json({"symbol": "BTCUSDT", "price": mock_price})
