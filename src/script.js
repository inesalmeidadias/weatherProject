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
    let days = ["sunday","monday","tuesday",
  "wednesday","thursday","friday","saturday"];
  let months = [
  "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    let day = days[fulldate.getDay()];
    let month = months[fulldate.getMonth()];
    let number = fulldate.getDate();
    return `${day} | ${number} ${month}`
}
function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
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
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(response.data.main.humidity);
    windspeedElement.innerHTML = Math.round(response.data.wind.speed);
    hoursElement.innerHTML = formatHours(response.data.dt * 1000);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`UI/icon export/${response.data.weather[0].icon}.png`); 
}
function search(city){
    let apiKey = "241565b36c772807137b137088048944";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature); 
}

search("New York");



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);