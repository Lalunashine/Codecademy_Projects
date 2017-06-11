// The URL for the JSON data, city id can be downloaded from http://bulk.openweathermap.org/sample/
var url = "http://api.openweathermap.org/data/2.5";
var query = "/group?id=3451220,5128638,2950159,2038349&units=metric"; // New York + Rio + Berlin + Beijing
var apiKey = "&APPID=3e70b996f07e3fab50b02acbcd0576bc";

var weatherData;
var worldMap;
var font;
var tSize = 15; // text size
var jsonLength; // num of cities
var cities; 
var weather;

function preload() {
  weatherData = loadJSON(url + query + apiKey, loadFinish()); // callback function for in case
  //weatherData = loadJSON("http://api.openweathermap.org/data/2.5/group?id=3451220,5128638,2950159,2038349&units=metric&APPID=3e70b996f07e3fab50b02acbcd0576bc");
  worldMap = loadImage('data/map.png');
  font = loadFont('data/font.otf');
}

function setup() {
  textFont(font);
  textSize(tSize);
  noStroke();
  initialize();
  console.log("test");
}

function draw() {
  for (var i = 0; i < jsonLength; i++) {
    weather.onCity(i); // show weather description and temperature of each city
  }
}

function loadFinish() {
  console.log("JSON Data is Loaded");
}

function initialize() {
  createCanvas(1148, 584);
  tint(255, 80); // add transparency on map
  background(worldMap);
  jsonLength = weatherData.cnt; // num of cities
  cities = weatherData.list; // simplify dot syntax
  
  weather = new Weather(cities); // create a new object 
  for (var i = 0; i < jsonLength; i++) {
    weather.getCity(i); // get location, name and country of each city
  }
}

function keyPressed() {
  if (key == ' ') {
    console.log("Restart");
    initialize();
  }
}