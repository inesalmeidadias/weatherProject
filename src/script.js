function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
    ];
    return `${hours}:${minutes}`;
}

function displayTemperature(response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#windspeed");
    let hoursElement = document.querySelector("#hours");
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    hoursElement.innerHTML = formatHours(response.data.dt * 1000);
}

let apiKey = "241565b36c772807137b137088048944";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);