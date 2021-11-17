// Date and Time - Get Current Time
function getDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour <= 9) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }

  let showDate = document.querySelector(".dateTime");

  if (hour >= 13) {
    showDate.innerHTML = `${day}, ${hour}:${minutes} P.M`;
  } else {
    showDate.innerHTML = `${day}, ${hour}:${minutes} A.M`;
  }
}
getDateTime();

// Getting City from User
function searchForCity(event) {
  event.preventDefault();
  let givenCity = document.querySelector("#search-bar-input");
  let theCity = document.querySelector(".searchedCity");
  if (givenCity.value) {
    theCity.innerHTML = `${givenCity.value}`;
  } else {
    alert("Please enter a city");
  }
}
let city = document.querySelector("#search-city");
city.addEventListener("submit", searchForCity);

// Get Logged API from Given City
let apiKey = "624159ad3ba6f7dd7f8492ffa1d7a854";
function logWeatherApi(response) {
  console.log(response);
}

// Build Weather Api
function getWeatherApi() {
  let givenCityName = document.querySelector("#search-bar-input");
  if (givenCityName.value) {
    console.log(`${givenCityName.value}`);
  }
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${givenCityName.value}&units=imperial&appid=${apiKey}`;
  axios.get(weatherApi).then(logWeatherApi);
}

let api = document.querySelector("#search-city");
api.addEventListener("submit", getWeatherApi);

// Show Weekly Forecast
function showWeeklyForecast(response) {
  console.log(response.data.daily);
  let weeklyForecastElement = document.querySelector(".weekForecast");
  let days = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday"];

  let weeklyForecast = `<div class="row">`;

  days.forEach(function (day) {
    weeklyForecast =
      weeklyForecast +
      `<div class="col">
        <div class="nextDay">${day}</div>
          <img class="futureImage" src="src/images/clear-day.svg" />
          <br/> 
          <span class="forecastTemperatureMax">77°</span> 
          <span class="forecastTemeratureMin">30°</span> 
        </div>`;
  });

  weeklyForecast = weeklyForecast + `</div>`;

  weeklyForecastElement.innerHTML = weeklyForecast;
}

// Get Weekly Forecast API
function getWeeklyForecast(coordinates) {
  let apiWeekly = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiWeekly).then(showWeeklyForecast);
}

// Get Weather from API with Given City
function giveWeatherFromApi(response) {
  console.log(response.data.main.temp);
  let apiWeather = Math.round(response.data.main.temp);
  let todaysTemp = document.querySelector(".todaysTemp");
  let apiWeatherDescription = response.data.weather[0].description;
  let weatherType = document.querySelector(".weatherType");
  let humidity = document.querySelector("#humidity");
  let apiHumidity = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let apiWind = Math.round(response.data.wind.speed);

  let apiIconCode = response.data.weather[0].icon;
  let weatherIcon = document.querySelector(".weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${apiIconCode}@2x.png`
  );

  if (apiWeather > -99) {
    todaysTemp.innerHTML = `${apiWeather}`;
    weatherType.innerHTML = `${apiWeatherDescription}`;
    humidity.innerHTML = `${apiHumidity}`;
    wind.innerHTML = `${apiWind}`;
  }

  fahrenheitTemp = Math.round(response.data.main.temp);

  getWeeklyForecast(response.data.coord);
}

function getWeatherFromApi() {
  let givenCityName = document.querySelector("#search-bar-input");
  if (givenCityName.value) {
    console.log(`${givenCityName.value}`);
  }
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${givenCityName.value}&units=imperial&appid=${apiKey}`;
  axios.get(weatherApi).then(giveWeatherFromApi);
}
let apiWeather = document.querySelector("#search-city");
apiWeather.addEventListener("submit", getWeatherFromApi);

// Get Current Location(long/lat) From Navigator
function naviPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let weatherApiWithCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(weatherApiWithCoords).then(giveCoordsWeather);
}

// Get Weather from Current Location API
function giveCoordsWeather(response) {
  console.log(response);
  let apiWeather = Math.round(response.data.main.temp);
  let todaysTemp = document.querySelector(".todaysTemp");
  let apiWeatherDescription = response.data.weather[0].description;
  let weatherType = document.querySelector(".weatherType");
  let humidity = document.querySelector("#humidity");
  let apiHumidity = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let apiWind = Math.round(response.data.wind.speed);

  let apiIconCode = response.data.weather[0].icon;
  let weatherIcon = document.querySelector(".weatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${apiIconCode}@2x.png`
  );

  if (apiWeather > -99) {
    todaysTemp.innerHTML = `${apiWeather}`;
    weatherType.innerHTML = `${apiWeatherDescription}`;
    humidity.innerHTML = `${apiHumidity}`;
    wind.innerHTML = `${apiWind}`;
  }

  fahrenheitTemp = response.data.main.temp;
}

let apiWeatherFromCoords = document.querySelector(".geoLocateButton");
apiWeatherFromCoords.addEventListener("click", naviPosition);

// Make Temperature Conversions (32°F − 32) × 5/9
let fahrenheitTemp = null;
let fahrenheit = document.querySelector(".fahrenheit");
let celsius = document.querySelector(".celsius");

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let inCelsius = document.querySelector(".todaysTemp");
  inCelsius.innerHTML = Math.round(celsiusTemp);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let inFahrenheit = document.querySelector(".todaysTemp");
  inFahrenheit.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);
