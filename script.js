// necessary variables
var city = "";
var lat = "";
var lon = "";
// necessary Html elements


// call render cities function from begginning

//event listener when submit button is clicked call cityweather function and store city function and render cities

$("#search-btn").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    city = $("#search-input").val().trim();
    // JSON.stringify(city);
    console.log(city);
    cityWeather()
    // cityForecast()
    // storeCity()
    // renderCities()
  });


// city weather function update the current city weather and forecasted weather for next days
function cityWeather() {

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&appid=abad0bc19c898043728c6921d1ef1d87";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    // Log the resulting object
    console.log(response);
    console.log(response.name);
    // changing city name and date
    $("#cityName").text(response.name + " ("+ curday('/') +") ");
    $('#wicon').attr('class', " ");
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    // changing city temperature
    $("#tempMain").text("Temperature: " + response.main.temp);
    // changing city Humidity
    $("#humMain").text("Humidity: " + response.main.humidity);
    // chnging wind speed
    $("#windMain").text("Wind Speed: " + response.wind.speed);
    // getting coordenates to use on UV Index
    lat = JSON.stringify(response.coord.lat);
    lon = JSON.stringify(response.coord.lon);
    // getting uv index trough new ajax
        const queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&appid=abad0bc19c898043728c6921d1ef1d87";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response) {
            // changing wind speed
            $("#UVI").text("UV index: " + response.value );
        })
})




}

// current day variable 

var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };
    console.log(curday('/'));


// storecity function store a new city on the local storage
// render cities function grab local storage array for cities and create buttons on the right place