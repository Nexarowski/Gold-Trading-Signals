const ctx = document.getElementById('goldChart').getContext('2d');
let goldChart = new Chart(ctx, {
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

function checkSignal() {
    const currentPrice = Math.random() * (2100 - 1800) + 1800;
    const buyLevel = 1900;
    const sellLevel = 2000;
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

// Aktualizacja co 5 sekund
setInterval(checkSignal, 5000);
