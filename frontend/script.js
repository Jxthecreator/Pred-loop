document.getElementById("predictBtn").addEventListener("click", async () => {
  const crypto = document.getElementById("crypto").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;
  const rsi = document.getElementById("rsi").checked;
  const macd = document.getElementById("macd").checked;
  const bb = document.getElementById("bb").checked;

  const btn = document.getElementById("predictBtn");
  btn.innerText = "⏳ Predicting...";
  btn.disabled = true;

  try {
    const response = await fetch("https://fastapi-production-04271.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cryptocurrency: crypto,
        model: model,
        timeframe: timeframe,
        indicators: {
          rsi: rsi,
          macd: macd,
          bollinger_bands: bb
        }
      })
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const result = await response.json();
    console.log("Prediction result:", result);
    alert("📈 Prediction: " + result.prediction); // Show the prediction

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check console.");
  } finally {
    btn.innerText = "⚡ Run Prediction";
    btn.disabled = false;
  }
});
