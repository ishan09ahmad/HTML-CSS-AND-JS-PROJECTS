import { API_KEY } from "./config.js";
const inputEl = document.querySelector("#input");
const searchBtn = document.querySelector("#search-button");
const errorEl = document.querySelector("#error");
const weatherDetailsEl = document.querySelector("#weather-details");
const weatherIcon = document.querySelector("#weatherIcon");
const temperatureEl = document.querySelector("#temperature");
const placeEl = document.querySelector("#place");
const humidityEl = document.querySelector("#humidity");
const windEl = document.querySelector("#wind");
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = API_KEY;
function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove("hide");
    setTimeout(() => {
        errorEl.classList.add("hide");
    }, 4000);
}
function handleCatchError(message) {
    showError(message);
    inputEl.value = "";
    weatherDetailsEl.classList.add("hide");
    setTimeout(() => {
        weatherDetailsEl.classList.remove("hide");
        renderData("kolkata");
    }, 4000);
}
function handleSearch() {
    const value = inputEl.value.trim();
    if (!value) {
        showError("Please enter a city name");
        return;
    }
    renderData(value);
}
async function renderData(city) {
    try {
        const response = await fetch(`${url}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        weatherDetailsEl.classList.remove("hide");
        errorEl.classList.add("hide");
        const temperature = Math.round(data.main.temp - 273.15);
        temperatureEl.textContent = `${temperature}°C`;
        placeEl.textContent = data.name;
        humidityEl.textContent = `${data.main.humidity}%`;
        windEl.textContent = `${data.wind.speed} km/h`;
        let weatherMain = data.weather[0]?.main;
        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else {
            weatherIcon.src = "images/drizzle.png";
        }
        inputEl.value = "";
    }
    catch (error) {
        if (error instanceof Error) {
            handleCatchError(error.message);
        }
        else {
            handleCatchError("Something went wrong");
        }
    }
}
searchBtn.addEventListener("click", handleSearch);
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});
renderData("kolkata");
//# sourceMappingURL=script.js.map