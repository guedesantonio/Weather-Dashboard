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
    $("#cityName").text(response.name );
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
            $("#UVI").text(response.value );
            

            if (response.value > 10 ) {
                $("#UVI").attr('style',  'background-color: #8A2BE2');

            } else if (response.value > 7 ) {
                $("#UVI").attr('style',  'background-color: #FF0000');

            } else if (response.value > 5 ) {
                $("#UVI").attr('style',  'background-color: #FF8C00');

            } else if (response.value > 2 ) {
                $("#UVI").attr('style',  'background-color: #FFD700	');

            } else {
                $("#UVI").attr('style',  'background-color: #008000 ');

            }
        })

         // getting forecast trough new ajax
         const queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat="+ lat + "&lon=" + lon + "&appid=abad0bc19c898043728c6921d1ef1d87";
         $.ajax({
             url: queryURL3,
             method: "GET"
         }).then(function(response) {
             console.log(response);

     
             $("#cityName").text(response.name);
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




         })
})




}

// setting up the days days variable 

for (i = 0; i < 6; i++) {
   

var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    var cd = dd + i ;

    if(cd<10) cd='0'+cd;
    if(mm<10) mm='0'+mm;
    return (cd+sp+mm+sp+yyyy);
    };
    $("#"+i).text(curday('/'));
}

    // cityForecast Function execute the ajax the city forecast api and modify html


// storecity function store a new city on the local storage
// render cities function grab local storage array for cities and create buttons on the right place