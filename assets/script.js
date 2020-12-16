// This is our API key. Add your own API key between the ""
var APIKey = "21747a34edbbbd58f73052aee9752074";
var place = "Roseburg,Oregon";
// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  place +
  "&units=imperial" +
  "&appid=" +
  APIKey;

$("#submit").on("click", function () {
  var newPlace = $("#input").val();

  console.log(newPlace);

  place = newPlace;
  return place;
});

// We then created an AJAX call
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

  var cityName = $("<h1>").append(response.name);
  var tempDiv = $("<p>").append("Temperature: " + tempF + " deg");
  var windDiv = $("<p>").append("Wind Speed: " + windSpeed + " mph");
  var humidityDiv = $("<p>").append("Humidity: " + humidity + "%");
  var container = $("<div>").append(cityName, tempDiv, humidityDiv, windDiv);
  $("#today").html(container);
  // Create CODE HERE to Log the queryURL
  // Create CODE HERE to log the resulting object
  // Create CODE HERE to calculate the temperature (converted from Kelvin)
  // Create CODE HERE to transfer content to HTML
  // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
  // Create CODE HERE to dump the temperature content into HTML
});

var APIKey = "21747a34edbbbd58f73052aee9752074";
var place2 = "Roseburg,Oregon";
// Here we are building the URL we need to query the database
var queryURL2 =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  place2 +
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

  for (let i = 0; i < forecast.length; i++) {
    if (i <= 6) {
      console.log(forecast[i]);
    }
  }
});
