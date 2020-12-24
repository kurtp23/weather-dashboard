// This is our API key. Add your own API key between the ""
var APIKey = "21747a34edbbbd58f73052aee9752074";
var newPlace = "Roseburg,Oregon";

// Here we are building the URL we need to query the database

$("#submit").on("click", function (event) {
  event.preventDefault();
  var newPlace = $("#input").val();

  console.log(newPlace);
  showWeather(newPlace);
  showForecast(newPlace);
});

// We then created an AJAX call
function showWeather(cityName) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var tempf = response.main.temp;
    tempF = tempf.toFixed(2);
    console.log(tempF);
    var windSpeed = response.wind.speed;
    console.log(windSpeed);
    var humidity = response.main.humidity;
    console.log(humidity);
    var date = moment.unix(response.dt).format(", dddd MM/DD/YYYY");
    var cityName = $("<h1>").append(response.name);
    cityName.append(date);
    var tempDiv = $("<p>").append("Temperature: " + tempF + " deg");
    var windDiv = $("<p>").append("Wind Speed: " + windSpeed + " mph");
    var humidityDiv = $("<p>").append("Humidity: " + humidity + "%");
    var container = $("<div>").append(cityName, tempDiv, humidityDiv, windDiv);
    $("#today").html(container);
  });
}
// Here we are building the URL we need to query the database
function showForecast(cityName) {
  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  // call for forecast
  $.ajax({
    url: queryURL2,
    method: "GET",
  }).then(function (response2) {
    console.log(response2);
    var forecast = response2.list;
    console.log(forecast);

    var indexes = [8, 16, 24, 32, 39];
    for (let i = 0; i < 5; i++) {
      var date = moment.unix(forecast[indexes[i]].dt).format("dddd, MM/DD/YYYY");
      var temp = forecast[indexes[i]].main.temp_max;
      var tempm = forecast[indexes[i]].main.temp_min;
      var hum = forecast[indexes[i]].main.humidity;
      console.log(date);
      $(".day" + (i + 1)).html(date);
      $(".temp" + (i + 1)).html("Temp: " + temp + " deg");
      $(".tempM1" + (i + 1)).html("Temp: " + tempm + " deg");
      $(".hum" + (i + 1)).html("Humidity: " + hum + "%");
    }
  });
}

if (localStorage.getItem("results") === null) {
  localStorage.setItem("results", JSON.stringify([]));
}

$("#searchForm").on("submit", function (event) {
  event.preventDefault();
  var myResults = JSON.parse(localStorage.getItem("results"));
  console.log(myResults);
  var newResult = $("#input").val();
  if (!myResults.includes(newResult)) {
    myResults.unshift(newResult);
  }
  console.log(newResult);

  console.log(myResults);

  localStorage.setItem("results", JSON.stringify(myResults));
  displayCities();
});
function displayCities() {
  var myResults = JSON.parse(localStorage.getItem("results"));
  $("#cityList").empty();
  $.each(myResults, function (index, value) {
    var city = `
  <li id="cityStor" class="list-group-item">${value}</li>
 `;

    $("#cityList").append(city);
    showWeather(myResults[0]);
    showForecast(myResults[0]);
    $(".list-group-item").on("click", function () {
      this.textContent;
      console.log(this.textContent);
      showWeather(this.textContent);
      showForecast(this.textContent);
    });
  });
}
displayCities();
showWeather(newPlace);
showForecast(newPlace);
