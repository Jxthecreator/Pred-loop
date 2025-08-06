document.addEventListener('DOMContentLoaded', () => {
  const predictBtn = document.getElementById('predictBtn');
  const resultCard = document.getElementById('resultCard');
  const predictedPrice = document.getElementById('predictedPrice');
  const trend = document.getElementById('trend');
  const confidence = document.getElementById('confidence');

  predictBtn.addEventListener('click', async () => {
    const crypto = document.getElementById('crypto').value;
    const model = document.getElementById('model').value;
    const timeframe = document.getElementById('timeframe').value;

    const indicatorElements = document.querySelectorAll('.indicators input[type="checkbox"]');
    const indicators = Array.from(indicatorElements)
      .filter(input => input.checked)
      .map(input => input.value);

    // Replace with your actual Railway backend URL
    const API_URL = "https://your-railway-subdomain.up.railway.app/predict";

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coin: crypto,
          model: model,
          timeframe: timeframe,
          indicators: indicators
        })
      });

      if (!response.ok) throw new Error('Prediction failed');

      const data = await response.json();

      predictedPrice.textContent = `$${parseFloat(data.predicted_price).toLocaleString()}`;
      trend.textContent = data.trend || "Uptrend";
      confidence.textContent = `${data.confidence || 0}%`;

      resultCard.style.display = 'block';
    } catch (error) {
      alert('❌ Error: ' + error.message);
      console.error('Prediction Error:', error);
    }
  });
});
