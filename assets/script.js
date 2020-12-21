// This is our API key. Add your own API key between the ""
var APIKey = "21747a34edbbbd58f73052aee9752074";
var newPlace = "Roseburg,Oregon";
showWeather(newPlace);
showForecast(newPlace);
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
    var date = moment.unix(response.dt).format(",dddd MM/DD/YYYY");
    var cityName = $("<h1>").append(response.name);
    cityName.append(" " + date);
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

    var indexes = [7, 14, 21, 28, 35];
    for (let i = 0; i < 5; i += 1) {
      var date = moment.unix(forecast[indexes[i]].dt).format("dddd, MMMM Do YYYY");
      var temp = forecast[indexes[i]].main.temp;
      var hum = forecast[indexes[i]].main.humidity;
      console.log(date);
      $(".day" + (i + 1)).html(date);
      $(".temp" + (i + 1)).html(temp);
      $(".hum" + (i + 1)).html(hum);
    }
  });
}
