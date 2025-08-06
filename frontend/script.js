document.addEventListener("DOMContentLoaded", () => {
  const predictBtn = document.getElementById("predictBtn");
  const resultCard = document.getElementById("resultCard");
  const predictedPrice = document.getElementById("predictedPrice");
  const trend = document.getElementById("trend");
  const confidence = document.getElementById("confidence");

  predictBtn.addEventListener("click", async () => {
    const crypto = document.getElementById("crypto").value;
    const model = document.getElementById("model").value;
    const timeframe = document.getElementById("timeframe").value;

    const indicators = [];
    document.querySelectorAll(".indicators input:checked").forEach(input => {
      indicators.push(input.value);
    });

    try {
      const res = await fetch(`https://pred-loop-api.up.railway.app/fastapi-production/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coin: crypto,
          model: model,
          timeframe: timeframe,
          indicators: indicators,
        }),
      });

      if (!res.ok) throw new Error("Prediction failed");

      const data = await res.json();

      predictedPrice.textContent = `$${data.price}`;
      trend.textContent = data.trend.toUpperCase();
      confidence.textContent = `${data.confidence}%`;

      resultCard.style.display = "block";
    } catch (err) {
      console.error(err);
      alert("Failed to get prediction. Please try again.");
    }
  });
});
