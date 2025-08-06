const apiUrl = "https://fastapi-production-04271.up.railway.app/predict";

document.getElementById("predictBtn").addEventListener("click", async () => {
  const symbol = document.getElementById("symbol").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;

  const indicators = [];
  if (document.getElementById("rsi").checked) indicators.push("RSI");
  if (document.getElementById("macd").checked) indicators.push("MACD");
  if (document.getElementById("bollinger").checked) indicators.push("Bollinger Bands");

  const payload = {
    symbol: symbol,
    model: model,
    timeframe: timeframe,
    indicators: indicators,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    document.getElementById("predictedPrice").textContent = result.predicted_price || "N/A";
    document.getElementById("trend").textContent = result.trend || "N/A";
    document.getElementById("confidence").textContent = result.confidence + "%" || "N/A";

    document.getElementById("resultCard").style.display = "block";
  } catch (error) {
    console.error("Prediction error:", error);
    alert("Something went wrong while fetching prediction.");
  }
});
