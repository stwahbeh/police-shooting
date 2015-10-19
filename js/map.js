// Function to draw your map
var drawMap = function() {

  // Create map and set view
var map = L.map('container').setView([43,-95],4);

  // Create a tile layer variable using the appropriate url
var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map
layer.addTo(map) 

  // Execute your function to get data
getData(map);
}

// Function for getting data
var getData = function(map) {

  // Execute an AJAX request to get the data in data/response.js
var data;
$.ajax({
     url:'data/response.json',
     type: "get",
     success:function(dat) {
       data = dat
        customBuild(map,data);
       // Do something with your data!
     }, 
     dataType:"json"
}) 

  // When your request is successful, call your customBuild function

}

// Loop through your data and add the appropriate layers and points
var customBuild = function(map, data) {
	// Be sure to add each layer to the map
  data.map(function(p)){
      if (p['Hit or Killed?'] == "Killed" ) {
        var circle = new L.circleMarker([$('lat'), $('lng')], {color:'red'}).addTo(map)
      } else {
        var circle = new L.circleMarker([$('lat'), $('lng')], {color:'black'}).addTo(map)
      }
    circle.addTo(layer)
    circle.bindPopup(text)
    
  }

  var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
  };

  L.control.layers(null,layers).addTo(map);
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}


