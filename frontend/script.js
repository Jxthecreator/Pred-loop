document.getElementById("predictBtn").addEventListener("click", async () => {
  const crypto = document.getElementById("crypto").value;
  const model = document.getElementById("model").value;
  const timeframe = document.getElementById("timeframe").value;

  const indicators = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((el) => el.value);

  const payload = {
    crypto,
    model,
    timeframe,
    indicators,
  };

  try {
    const res = await fetch("https://fastapi-production-xxxx.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    document.getElementById("predictedPrice").innerText = data.price || "N/A";
    document.getElementById("trend").innerText = data.trend || "N/A";
    document.getElementById("confidence").innerText = `${data.confidence || "N/A"}%`;

    document.getElementById("resultCard").style.display = "block";
  } catch (err) {
    alert("Prediction failed. Please check your backend.");
    console.error(err);
  }
});
