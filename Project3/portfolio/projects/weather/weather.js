function Weather(cities) {
  this.cities = cities;

  this.getCity = function(index) { // show city name and country
    var lon = this.cities[index].coord.lon; // gat longtitude and latitude
    var lat = this.cities[index].coord.lat;
    lon = map(lon, -180, 180, 0, width); // correspond to map 
    lat = map(lat, -90, 90, height, 0);
    var name = cities[index].name;
    var country = cities[index].sys.country;

    fill(0);
    ellipse(lon, lat, 5, 5);
    text(name + ", " + country, lon, lat + 15);
  }
  this.onCity = function(index) { // show weather data when mouse is near to some city
    var lon = cities[index].coord.lon;
    var lat = cities[index].coord.lat;
    lon = map(lon, -180, 180, 0, width);
    lat = map(lat, -90, 90, height, 0);

    if ((mouseX > lon - 10) && (mouseX < lon + 10) && (mouseY > lat - 10) && (mouseY < lat + 10)) {
      this.showData(index, lon, lat);
    } else {
      if (frameCount%10 === 0) { 
        fill(200, 1);
        rect(lon, lat + 20, 140, 80);
      }
    }
  }

  this.showData = function(index, posx, posy) { // show weather description and temperature
    var info = cities[index].weather[0].description;
    var temp = cities[index].main.temp;

    fill(255, 20); 
    rect(posx, posy+20, 140, 80); // text background rect
    fill(150); 
    text(info, posx+2, posy + 40); // show weather description
    
    fill(100+temp*10, 100, 255-temp*10);
    ellipse(posx+temp*7, posy+60, temp*3, temp*3); // visualize temp: higher - bigger - more red/right
    text(temp+" °C", posx+temp*5.5, posy+90); // show temp
  }
}

/* previous methods
function getCity(index) {
  var lon = cities[index].coord.lon;
  var lat = cities[index].coord.lat;
  lon = map(lon, -180, 180, 0, width);
  lat = map(lat, -90, 90, height, 0);
  fill(0);
  ellipse(lon, lat, 5, 5);

  var name = cities[index].name;
  var country = cities[index].sys.country;
  text(name + ", " + country, lon, lat + 15);
}

function onCity(index) {
  var lon = cities[index].coord.lon;
  var lat = cities[index].coord.lat;
  lon = map(lon, -180, 180, 0, width);
  lat = map(lat, -90, 90, height, 0);
  
  if ((mouseX > lon - 10) && (mouseX < lon + 10) && (mouseY > lat - 10) && (mouseY < lat + 10)) {
    showData(index, lon, lat);
  } else {
    fill(255, 0);
    rect(lon, lat + tSize * 2, 100, tSize * 5);
  }
}

function showData(index, posx, posy) {
  var info = cities[index].weather[0].description;
  var temp = cities[index].main.temp;
  var wind = cities[index].wind;
  fill(255, 50);
  rect(posx, posy+20, 100, 60);
  fill(150);
  text(info, posx+5, posy+40);
}
*/