
document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("rmseChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["XGBoost", "LSTM", "Prophet"],
            datasets: [{
                label: "RMSE (Lower is better)",
                data: [350, 410, 380],
                backgroundColor: ["#bc13fe", "#0ff0fc", "#ff2ced"]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "#fff"
                    }
                },
                x: {
                    ticks: {
                        color: "#fff"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById("confidenceChart").getContext("2d");
    const chart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Confidence (%)",
                data: [78, 81, 76, 83, 80, 85, 82],
                borderColor: "#0ff0fc",
                backgroundColor: "rgba(15, 240, 252, 0.1)",
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: "#fff"
                    }
                },
                x: {
                    ticks: {
                        color: "#fff"
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    });
});
