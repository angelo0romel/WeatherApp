/*
Author: Angelo Romel Lopez (B00285812)
*/

/*
This file contains a list of key-value pairs of country names and codes.
*/
var countrySymbol = {
	"AU":"Australia",
	"AT":"Austria",
	"CA":"Canada",
	"FR":"France",
	"DE":"Germany",
	"GR":"Greece",
	"HK":"Hong Kong",
	"IN":"India",
	"IT":"Italy",
	"JP":"Japan",
	"NZ":"New Zealand",
	"PH":"Philippines",
	"SP":"Spain",
	"UK":"United Kingdom",
	"US":"United States"
};

/*
loadJSON('http://api.openweathermap.org/data/2.5/weather?q=clydebank,uk&appid=2de143494c0b295cca9337e1e96b00e0&units=metric&appid=ccaf6faaeacdea9f10abdff2f83b0e60', \
getWeatherData);

function getWeatherData(data){
	var weather = data;
	...weather.weather.main;
	...weather.main.temp;
}

url for geolocation:
http://api.openweathermap.org/data/2.5/weather?lat=55.9171724&lon=-4.449574699999999&units=metric&appid=2de143494c0b295cca9337e1e96b00e0
*/