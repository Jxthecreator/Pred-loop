const predictBtn = document.getElementById("predictBtn");
const resultCard = document.getElementById("resultCard");
const predictedPrice = document.getElementById("predictedPrice");
const trend = document.getElementById("trend");
const confidence = document.getElementById("confidence");

predictBtn.addEventListener("click", async () => {
  const crypto = document.getElementById("crypto").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;

  const indicators = Array.from(document.querySelectorAll(".indicators input:checked"))
                          .map(input => input.value);

  try {
    predictBtn.textContent = "⏳ Predicting...";
    predictBtn.disabled = true;

    const response = await fetch("https://fastapi-production-04271.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        crypto,
        model,
        timeframe,
        indicators
      })
    });

    const data = await response.json();

    // Show results
    predictedPrice.textContent = `$${data.predicted_price.toFixed(2)}`;
    trend.textContent = data.trend;
    confidence.textContent = `${data.confidence}%`;
    resultCard.style.display = "block";
  } catch (error) {
    console.error("Prediction failed:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    predictBtn.textContent = "🚀 Run Prediction";
    predictBtn.disabled = false;
  }
});
