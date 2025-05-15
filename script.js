// Hasło root
const ROOT_PASSWORD = "root";  // Zmień na bardziej bezpieczne

function checkPassword() {
    const inputPassword = document.getElementById("password").value;
    const errorElement = document.getElementById("login-error");

    if (inputPassword === ROOT_PASSWORD) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
        initChart();
    } else {
        errorElement.textContent = "Nieprawidłowe hasło!";
    }
}

let goldChart;
let priceHistory = [];

function initChart() {
    const ctx = document.getElementById('goldChart').getContext('2d');
    goldChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Cena złota (USD)',
                data: [],
                borderColor: '#DAA520',
                backgroundColor: 'rgba(218, 165, 32, 0.2)',
                borderWidth: 2,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Czas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cena (USD)'
                    }
                }
            }
        }
    });

    // Uruchom pierwszy sygnał
    checkSignal();
}

function checkSignal() {
    const currentPrice = Math.random() * (2100 - 1800) + 1800;
    const buyLevel = 1900;
    const sellLevel = 2000;

    priceHistory.push(currentPrice);
    if (priceHistory.length > 20) {
        priceHistory.shift();
    }

    const signalElement = document.getElementById("signal");
    if (currentPrice < buyLevel) {
        signalElement.textContent = "💰 Sygnał Kupna! Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "green";
    } else if (currentPrice > sellLevel) {
        signalElement.textContent = "🔻 Sygnał Sprzedaży! Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "red";
    } else {
        signalElement.textContent = "🔄 Brak wyraźnego sygnału. Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "#444";
    }

    updateChart(currentPrice);
    calculateIndicators();
}

function updateChart(price) {
    const now = new Date().toLocaleTimeString();
    goldChart.data.labels.push(now);
    goldChart.data.datasets[0].data.push(price);
    if (goldChart.data.labels.length > 20) {
        goldChart.data.labels.shift();
        goldChart.data.datasets[0].data.shift();
    }
    goldChart.update();
}

function calculateIndicators() {
    const rsiValue = (Math.random() * 100).toFixed(2);
    const macdValue = (Math.random() * 2 - 1).toFixed(4);
    const emaValue = (priceHistory.reduce((a, b) => a + b, 0) / priceHistory.length).toFixed(2);

    document.getElementById("rsi-value").textContent = "RSI: " + rsiValue;
    document.getElementById("macd-value").textContent = "MACD: " + macdValue;
    document.getElementById("ema-value").textContent = "EMA: " + emaValue;
}

function executeTrade(type) {
    alert(type === 'buy' ? "Kupujesz złoto!" : "Sprzedajesz złoto!");
}

// Automatyczna aktualizacja co 5 sekund
setInterval(checkSignal, 5000);
