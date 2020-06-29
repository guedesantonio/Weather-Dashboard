// necessary variables
var city = "";
var lat = "";
var lon = "";
var cities = [];
var forecastTemp = 0 ;



init()

function init() {
    // Get stored cities from localStorage
    // Parsing the JSON string to an object
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    // If cities were retrieved from localStorage, update the cities array to it
    if (storedCities !== null) {
        cities = storedCities;
    }

    // Render cities to the DOM
    renderCities();
}


// render cities function grab local storage array for cities and create buttons on the right place
function renderCities() {
    $("#btn-container").empty();

    cities.forEach(myFunction);

    function myFunction(i) {
        // Create a variable called "btnCity" and set the variable equal to a new btn.
        const btnCity = $("<button>");

        //Give each "btnCity" class
        btnCity.addClass("cityBtn btn btn-outline-secondary btn-light text-left");
        btnCity.attr("type", "button");
        btnCity.attr("id", i);
        btnCity.text(i);
        $("#btn-container").prepend(btnCity);

    }


}

//event listener when submit button is clicked call cityweather function and store city function and render cities

$("#search-btn").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    city = $("#search-input").val().trim();
    // JSON.stringify(city);
    console.log(city);
    cityWeather()
    //clear input
    $("#search-form").trigger("reset");
});

//event listener when city button is clicked call cityweather function

$("#btn-container").on("click", "button", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox

        city = $(this).attr("id");
        cityWeather()
    
    
});


// city weather function update the current city weather and forecasted weather for next days
function cityWeather() {

    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=abad0bc19c898043728c6921d1ef1d87";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Log the resulting object
        console.log(response);
        console.log(response.name);
        // changing city name and date
        $("#cityName").text(response.name);
        $("#currentDate").text(convertTimestamptoTime(response.dt))
        // Add new city to cities array 
        if (cities.indexOf(response.name) > -1) {
        } else {
            cities.push(response.name);
            storeCity()
            renderCities()
        }
        // adding icon
        $('#wicon').attr('class', " ");
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl);
        // changing city temperature
        var mainTemp = convertKelvinToCelsius(response.main.temp)
        $("#tempMain").text("Temperature: " + mainTemp + " ºC");
        // changing city Humidity
        $("#humMain").text("Humidity: " + response.main.humidity + "%");
        // chnging wind speed
        $("#windMain").text("Wind Speed: " + (Math.floor(10*(response.wind.speed * 1.609344))/10) + " KPH");
        // getting coordenates to use on UV Index
        lat = JSON.stringify(response.coord.lat);
        lon = JSON.stringify(response.coord.lon);
        // getting uv index trough new ajax
        const queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=abad0bc19c898043728c6921d1ef1d87";

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            // changing wind speed
            $("#UVI").text(response.value);


            if (response.value > 10) {
                $("#UVI").attr('style', 'background-color: #8A2BE2');

            } else if (response.value > 7) {
                $("#UVI").attr('style', 'background-color: #FF0000');

            } else if (response.value > 5) {
                $("#UVI").attr('style', 'background-color: #FF8C00');

            } else if (response.value > 2) {
                $("#UVI").attr('style', 'background-color: #FFD700	');

            } else {
                $("#UVI").attr('style', 'background-color: #008000 ');

            }
        })

        // Forecast ajax to get the city forecast api and modify html
        const queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=abad0bc19c898043728c6921d1ef1d87";
        $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //  updating forecast divs
            var j = 3;

            for (i = 0; i < 5; i++) {
                // updating icon
                $("#i" + i).attr('class', " ");
                var iconcode = response.list[i].weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $("#i" + i).attr('src', iconurl);
                // updating temp
                forecastTemp = convertKelvinToCelsius(response.list[i].main.temp)
                $("#iTemp" + i).text("Temp: " + forecastTemp + " ºC");
                // updating Humidity
                $("#iHum" + i).text("Humidity: " + response.list[i].main.humidity + "%");

                 //  getting dateText forecast for only 12pm each day
                
                //  MUDAR DATA PARA FORMATO X/X/XX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                
                $("#" + i).text(convertTimestamptoTime(response.list[j].dt));
                j+=8;
                


            }
           



           



        })
    })


}




function convertTimestamptoTime(unixTimestamp) { 

    // convert to milliseconds and  
    // then create a new Date object 
    dateObj = new Date(unixTimestamp * 1000); 
    utcString = dateObj.toUTCString(); 
    
    time = utcString.slice(0, 16); 
    return time ;
    
} 


function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'below absolute zero (0 K)';
	} else {
		return (Math.floor(10*(kelvin-273.15))/10) ;
	}
}



// storecity function store a new city on the local storage

function storeCity() {
    // Stringify and set "todos" key in localStorage to todos array
    localStorage.setItem("cities", JSON.stringify(cities));
}
