function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`;
}
function formatDate(datestamp) {
    let fulldate = new Date(datestamp);
    let days = ["sunday","Monday","tuesday",
  "wednesday","thursday","friday","saturday"];
  let months = [
  "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    let day = days[fulldate.getDay()];
    let month = months[fulldate.getMonth()];
    let number = fulldate.getDate();
    return `${day}, ${number} ${month}`
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["sun","mon","tue",
  "wed","thu","fri","sat"];
    return days[day];
}
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML=`<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6){ 
        forecastHTML = forecastHTML + `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                <img src="UI/icon export/${forecastDay.weather[0].icon}.png" alt="#" width="40" />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round((forecastDay.temp.max)/10)}º </span
                  ><span class="weather-forecast-temperature-min">${Math.round((forecastDay.temp.min)/10)}º</span>
                </div>
              </div>`;
    }});
    forecastHTML = forecastHTML +`</div>`;
    forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "241565b36c772807137b137088048944";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeedElement = document.querySelector("#windspeed");
    let hoursElement = document.querySelector("#hours");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    celsiusTemperature = response.data.main.temp;
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    hoursElement.innerHTML = formatHours(response.data.dt * 1000);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`UI/icon export/${response.data.weather[0].icon}.png`); 

    getForecast(response.data.coord);
}
function search(city){
    let apiKey = "241565b36c772807137b137088048944";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature); 
}
function displayFahrenheitTemperature(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
