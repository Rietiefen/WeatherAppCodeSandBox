// Feature #1
function updateTime() {
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let showTime = `${hour} : ${min}`;

  document.querySelector(".cityTime").innerHTML = showTime;
}
updateTime();

function updateDate() {
  let date = new Date();
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let showDate = days[dayIndex];
  document.querySelector(".cityDate").innerHTML = showDate;
}
updateDate();

// // Feature #2
// function changeCityName(event) {
//   event.preventDefault();
//   let inputCityName = document.getElementById("inputacity");
//   let cityname = document.querySelector(".cityname");
//   cityname.innerHTML = inputCityName.value;
// }

// let inputCityName = document.querySelector("button");
// inputCityName.addEventListener("click", changeCityName);

// // Feature #3
// function mouseDownF() {
//   document.getElementById("mainTemp").innerHTML = "90";
//   let element = document.querySelector(".tempF");
//   element.classList.add("mystyle");
//   let element2 = document.querySelector(".tempC");
//   element2.classList.remove("mystyle");
// }

// let tempF = document.querySelector(".tempF");
// tempF.addEventListener("mousedown", mouseDownF);

// function mouseDownC() {
//   document.getElementById("mainTemp").innerHTML = "32";
//   let element = document.querySelector(".tempC");
//   element.classList.add("mystyle");
//   let element2 = document.querySelector(".tempF");
//   element2.classList.remove("mystyle");
// }

// let tempC = document.querySelector(".tempC");
// tempC.addEventListener("mousedown", mouseDownC);

// display city Name
function insertCityName(event) {
  event.preventDefault();
  let cityName = document.getElementById("inputacity");
  let tempElement = document.querySelector(".cityname");
  tempElement.innerHTML = cityName.value;
}

let cityName = document.querySelector("button");
cityName.addEventListener("click", insertCityName);

// update Temp
function getCityTemp() {
  let cityName2 = document.getElementById("inputacity").value;
  // let cityName3 = cityName2.toLowerCase().trim();
  let apiKey = "10bffd0ee69586cf4e1b1e702883c72c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName2}&units=metric&appid=10bffd0ee69586cf4e1b1e702883c72c`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateCityTemp);
}

function updateCityTemp(response) {
  let tempRound = Math.round(response.data.main.temp);
  let tempElement = document.getElementById("mainTemp");
  tempElement.innerHTML = `${tempRound}`;
}

cityName.addEventListener("click", getCityTemp);

// current button
function showCurrentTempPlace(response) {
  let cityName = document.querySelector(".cityname");
  let currentCityName = response.data.name;
  cityName.innerHTML = currentCityName;

  let mainTemp = document.getElementById("mainTemp");
  let currentTemp = Math.round(response.data.main.temp);
  mainTemp.innerHTML = currentTemp;
}

function getCurrentPlace(position) {
  // let apiKey = "10bffd0ee69586cf4e1b1e702883c72c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=10bffd0ee69586cf4e1b1e702883c72c`;
  axios.get(apiUrl).then(showCurrentTempPlace);
}

function currentPlace() {
  navigator.geolocation.getCurrentPosition(getCurrentPlace);
}

let currentButton = document.getElementById("currentlocation");
currentButton.addEventListener("click", currentPlace);
