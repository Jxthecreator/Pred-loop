async function runPrediction() {
  const crypto = document.getElementById("crypto").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;

  const indicators = [];
  document.querySelectorAll(".indicators input:checked").forEach((checkbox) => {
    indicators.push(checkbox.value);
  });

  const payload = {
    crypto,
    model,
    timeframe,
    indicators,
  };

  try {
    const response = await fetch("https://pred-loop-production.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    document.getElementById("resultCard").style.display = "block";
    document.getElementById("predictedPrice").textContent = data.predicted_price || "-";
    document.getElementById("trend").textContent = data.trend || "-";
    document.getElementById("confidence").textContent = data.confidence || "-";
  } catch (err) {
    alert("Prediction failed. Try again later.");
    console.error(err);
  }
}
