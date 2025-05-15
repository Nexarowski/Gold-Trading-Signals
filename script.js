function checkSignal() {
    const currentPrice = Math.random() * (2100 - 1800) + 1800;
    const buyLevel = 1900;
    const sellLevel = 2000;

    const signalElement = document.getElementById("signal");

    if (currentPrice < buyLevel) {
        signalElement.textContent = "Sygnał Kupna! Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "green";
    } else if (currentPrice > sellLevel) {
        signalElement.textContent = "Sygnał Sprzedaży! Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "red";
    } else {
        signalElement.textContent = "Brak wyraźnego sygnału. Aktualna cena: $" + currentPrice.toFixed(2);
        signalElement.style.color = "#444";
    }
}
