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
	// Be sure to add each layer to the   map
  var layers = [];
  var race = '';
  var groups = [];
  data.map(function(p){
    
    if (p.Race == undefined){
      race = "unidentified";
      console.log(race + "1");
    } else {
      race = p.Race;
      console.log(race);
    }
      if($.inArray(race, layers) != race){  
         console.log(race + "2");       
         layers.push(race);         
         groups.push(new L.LayerGroup([]))
         
      }
      var index = layers.indexOf("race");
      console.log(index);
      if (p['Hit or Killed?'] == "Killed" ) {
        console.log(p['Hit or Killed?']);
        console.log(race + "3");
        var circle = new L.circleMarker ([p.lat, p.lng], 200, {color: 'red', color:'red'})
        circle.addTo(groups[index])
        console.log(race + "3");
    } else {
        console.log(race + "4");
        var circle = new L.circleMarker ([p.lat, p.lng] , 200, {color: 'black', color:'black'})
        circle.addTo(groups[index])
        console.log(race + "4");
      }

    var summary = p.Summary;
    var link = p['Source Link']; 
    circle.bindPopup(summary + link);  

    L.control.layers (groups).addTo(map) 


  //L.control.layers(null,layers).addTo(map);
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
})
}

