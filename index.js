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
    "Saturday"
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

// Get Weather from API with Given City
function giveWeatherFromApi(response) {
  console.log(response.data.main.temp);
  let apiWeather = Math.round(response.data.main.temp);
  let todaysTemp = document.querySelector(".todaysTemp");
  let apiWeatherDescription = response.data.weather[0].description;
  let weatherType = document.querySelector(".weatherType");
  if (apiWeather > -99) {
    todaysTemp.innerHTML = `${apiWeather}`;
    weatherType.innerHTML = `${apiWeatherDescription}`;
  }
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

  let weatherApiWithCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(weatherApiWithCoords).then(giveCoordsWeather);
}

// Get Weather from Current Location API
function giveCoordsWeather(response) {
  console.log(response);
  let apiWeather = Math.round(response.data.main.temp);
  let todaysTemp = document.querySelector(".todaysTemp");
  let apiWeatherDescription = response.data.weather[0].description;
  let weatherType = document.querySelector(".weatherType");
  if (apiWeather > -99) {
    todaysTemp.innerHTML = `${apiWeather}`;
    weatherType.innerHTML = `${apiWeatherDescription}`;
  }
}

let apiWeatherFromCoords = document.querySelector(".geoLocateButton");
apiWeatherFromCoords.addEventListener("click", naviPosition);
