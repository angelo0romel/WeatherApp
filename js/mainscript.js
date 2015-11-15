/*
Author: Angelo Romel Lopez (B00285812)
*/
//Array that holds location objects.
var locationArray = new Array();
//stores the city name and the country code that the user has selected from the location selection screen.
var currentCity, currentCountry;
//Store login status. true = user is logged in. false = not logged in.
var isLoggedIn = false;

//Constructor definition for a location object that stores the city name, country code and id.
var Location = function(cityName, countryCode, id){
	this.cityName = cityName;
	this.countryCode = countryCode;
	this.id = id;
};

//Make sure that the document and all of it's components are successfuly loaded before making any reference.
$(document).ready(function(){
	//Initialize the page.
	start();
	initPage();	
	/*
	Event Handlers:
	*/
	$("#currentlocation").click(function(){
		clearPage();
		showWeatherByGeoCoord();
	});	

	$("#btngetweather").click(function(){
		currentCity = $("#selectedcity").val();
		currentCountry = $("#countrylist").val();
		clearPage();
		showWeatherByCity();
		$.mobile.changePage("#weather");
	});
});
/*
Function that will be called when the document is loaded.
*/
function start(){
	//Update and display weather information if a weather location object exists in the local storage.
	if(localStorage.getItem("weatherLocation") !== null){
		loadWeather();
	}
	//Display weather information for the current location using geolocation latitude and longitude information.
	else{
		//current location
	}
}
/*
Loads data from local storage.
*/
function loadWeather(){
	//Test if the weather and location array is not empty.
	if(weatherLocationArray.length > 0){
		if(weatherLocationArray[0] != "undefined" && weatherLocationArray[0] != "null"){
			updateWeatherLocationList();
		}
		else{
			//current location
		}
	}
	else{
		//current location
	}
}

/*
Update weather data objects.
*/
function updateLocalList(){
	if(navigator.online){

	}
	else{
		showMessage("Currently offline. Old weather information will be displayed. \
			Please connect to the internet to get latest weather information.");
	}
}

/*
Update weather data objects.
*/
function updateOnlineList(){
	if(navigator.online){

	}
	else{
		showMessage("Currently offline. Old weather information will be displayed. \
			Please connect to the internet to get latest weather information.");
	}
}

/*
Display weather data objects.
*/
function displayLocationList(){

}

/*
Display weather information on current location.
*/
function displayCurrentLocation(){
	if(navigator.online){

	}
	else{
		showMessage("Currently offline. Please connect to the internet");
	}
}
/*
Method that displays an alert message on the page.
	*/
	function showMessage(alert){
	    $("#alertmessage").html(alert);
	    $(".ui-dialog").dialog("close");
	    $.mobile.changePage("#alert", "pop");
}

/*
Page initialization.
*/
function initPage(){
	/*
	Toggle log in and log out buttons, depending on user's log in status.
	*/
	if(isLoggedIn){
		$("#login").toggle(false);
		$("#logout").toggle(true);
	}
	else{
		$("#login").toggle(true);
		$("#logout").toggle(false);
	}
	/*
	Populate list of countries for the selection drop-down. The list of countries and 
	their corresponding codes are in the js/countrysymbol.js file.
	*/
	var options = "";
	for(symbol in countrySymbol){
		options += "<option value = '" + symbol + "'>" + countrySymbol[symbol] + "</option>"
	}
	$("#countrylist").html(options);
}

/**
Display the five day weather forecast of a selected city.
*/
function showWeatherByCity(){
	var list = $("#forecastlist");
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "," + currentCountry + "&units=metric&appid=ccaf6faaeacdea9f10abdff2f83b0e60", function(data){
	$("#cityname").text(data.city.name + ", ");
	$("#countrycode").text(data.city.country);
	for(var i = 0; i < data.list.length; i ++){
		list.append("<li><span style = 'font-size:200%;'>" + getDay(new Date(data.list[i].dt * 1000).getDay()) + "&nbsp;&nbsp;<span style = 'font-size:60%;'>" + new Date(data.list[i].dt * 1000).getHours() + ":" + zeroPrefix(new Date(data.list[i].dt * 1000).getMinutes()) + "</span>" + "</span>" + "</li>");
		list.append("<li style = 'font-size:150%;'>" + data.list[i].weather[0].main + "/" + data.list[i].weather[0].description +  "</li>");
		list.append("<li style = 'text-align:right;'>High <span style = 'font-size:200%;'>" + data.list[i].main.temp_max + " C</span>" + "</li>");
		list.append("<li style = 'text-align:right;'>Low <span style = 'font-size:200%;'>" + data.list[i].main.temp_min + " C</span>" + "</li><br/>");
		list.append("<li>Wind Speed > <span style = 'font-size:150%;'>" + data.list[i].wind.speed + "</span> m/s" + "</li>");
		list.append("<li>Wind Direction > <span style = 'font-size:150%;'>" + data.list[i].wind.deg + "</span> degrees" + "</li>");

		list.append("<p class = 'horizontalline'></p>");
	}
	saveLocation(data.city.name, data.city.country, data.city.id);
	updateLocationList();
	});
}

/*
Display the five day weather forecast of a geolocation latitude and longitude.
*/
function showWeatherByGeoCoord() {   
	var list = $("#forecastlist");
	if(navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(
            function(position){//run this function if location is available.	
                $.getJSON("http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=ccaf6faaeacdea9f10abdff2f83b0e60", function(data){
					$("#cityname").text(data.city.name + ", ");
					$("#countrycode").text(data.city.country);
					for(var i = 0; i < data.list.length; i ++){
						list.append("<li><span style = 'font-size:200%;'>" + getDay(new Date(data.list[i].dt * 1000).getDay()) + "&nbsp;&nbsp;<span style = 'font-size:60%;'>" + new Date(data.list[i].dt * 1000).getHours() + ":" + zeroPrefix(new Date(data.list[i].dt * 1000).getMinutes()) + "</span>" + "</span>" + "</li>");
						list.append("<li style = 'font-size:150%;'>" + data.list[i].weather[0].main + "/" + data.list[i].weather[0].description +  "</li>");
						list.append("<li style = 'text-align:right;'>High <span style = 'font-size:200%;'>" + data.list[i].main.temp_max + " C</span>" + "</li>");
						list.append("<li style = 'text-align:right;'>Low <span style = 'font-size:200%;'>" + data.list[i].main.temp_min + " C</span>" + "</li><br/>");
						list.append("<li>Wind Speed > <span style = 'font-size:150%;'>" + data.list[i].wind.speed + "</span> m/s" + "</li>");
						list.append("<li>Wind Direction > <span style = 'font-size:150%;'>" + data.list[i].wind.deg + "</span> degrees" + "</li>");

						list.append("<p class = 'horizontalline'></p>");
					}
					saveLocation(data.city.name, data.city.country, data.city.id);
					updateLocationList();
				});
            },
           	function(error){//show error message if an error is encountered.
                switch(error.code){
                  	case error.TIMEOUT:                                
                    break;
                    case error.POSITION_UNAVAILABLE:                                
                    break;
                    case error.PERMISSION_DENIED:
                    break;
                    case error.UNKNOWN_ERROR:
                    break;
                }
           	}
        );
    }
    else{
        showMessage("Unable to determine your location. Make sure that location services is turned on.");
    }
}

/**
Display the five day weather forecast of a selected city by it's id.
*/
function showWeatherById(id){
	var list = $("#forecastlist");
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=2de143494c0b295cca9337e1e96b00e0", function(data){
		$("#cityname").text(data.city.name + ", ");
		$("#countrycode").text(data.city.country);
		for(var i = 0; i < data.list.length; i ++){
			list.append("<li><span style = 'font-size:200%;'>" + getDay(new Date(data.list[i].dt * 1000).getDay()) + "&nbsp;&nbsp;<span style = 'font-size:60%;'>" + new Date(data.list[i].dt * 1000).getHours() + ":" + zeroPrefix(new Date(data.list[i].dt * 1000).getMinutes()) + "</span>" + "</span>" + "</li>");
			list.append("<li style = 'font-size:150%;'>" + data.list[i].weather[0].main + "/" + data.list[i].weather[0].description +  "</li>");
			list.append("<li style = 'text-align:right;'>High <span style = 'font-size:200%;'>" + data.list[i].main.temp_max + " C</span>" + "</li>");
			list.append("<li style = 'text-align:right;'>Low <span style = 'font-size:200%;'>" + data.list[i].main.temp_min + " C</span>" + "</li><br/>");
			list.append("<li>Wind Speed > <span style = 'font-size:150%;'>" + data.list[i].wind.speed + "</span> m/s" + "</li>");
			list.append("<li>Wind Direction > <span style = 'font-size:150%;'>" + data.list[i].wind.deg + "</span> degrees" + "</li>");

			list.append("<p class = 'horizontalline'></p>");
		}
		saveLocation(data.city.name, data.city.country, data.city.id);
		updateLocationList();
	});                   
}

/*
Returns the name of the Day, eg. Monday, Tuesday...
0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
*/
function getDay(day){
	var dayName = "";
	switch(day){
		case 0:
			dayName = "Sunday";
			break;
		case 1:
			dayName = "Monday";
			break;
		case 2:
			dayName = "Tuesday";
			break;
		case 3:
			dayName = "Wednesday";
			break;
		case 4:
			dayName = "Thursday";
			break;
		case 5:
			dayName = "Friday";
			break;
		case 6:
			dayName = "Saturday";
			break;
	}
	return dayName;
}

/*
Adds a leading zero to the argument passed to this function.
*/
function zeroPrefix(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

/*
Clear the weather page.
*/
function clearPage(){
	$("#cityname").text("");
	$("#countrycode").text("");
	$("#forecastlist").empty();
}

/*
Save a location in an array.
*/
function saveLocation(cityName, countryCode){
	//if (!isLocationSaved()){
	var newLocation = new Location(cityName, countryCode);
	locationArray.push(newLocation);
}

/*
Update the list that displays the locations.
*/
function updateLocationList(){
	var locationList = $("#locationlist");
	locationList.empty();
	for(var i = 0; i < locationArray.length; i ++){
		locationList.append("<li><a id = '' class = 'ui-btn'>" + locationArray[i].cityName + ", " + locationArray[i].countryCode + "</a></li>");
		locationList.append("<li><a id = '' class = 'ui-btn ui-icon-delete ui-btn-icon-left'>" + "Remove " + locationArray[i].cityName + " from List" + "</a></li>");
	}
}

/*
Check if location is already saved. Returns true if it is, false otherwise.
*/
function isLocationExists(){

}
