document.getElementById("predictBtn").addEventListener("click", async () => {
  const crypto = document.getElementById("crypto").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;
  const indicators = Array.from(document.querySelectorAll(".indicator:checked"))
    .map(i => i.value);

  try {
    const response = await fetch("https://fastapi-production-04271.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crypto, model, timeframe, indicators })
    });

    const data = await response.json();

    document.getElementById("predictedPrice").textContent = `$${data.predicted_price}`;
    document.getElementById("trend").textContent = data.trend;
    document.getElementById("confidence").textContent = `${data.confidence}%`;

    document.getElementById("resultCard").style.display = "block";
  } catch (err) {
    alert("Prediction failed. Check console.");
    console.error(err);
  }
});
