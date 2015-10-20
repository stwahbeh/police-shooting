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
  var layers = [],
      race = '',
      groups = [],
      white = 0,
      nonWhite = 0,
      wMen = 0,
      wWomen = 0,
      nMen = 0,
      nWomen = 0;
  data.map(function(p){
   
    if (p.Race == undefined || p.Race == "Unknown"){
      race = "Unidentified";
      
    } else {
      race = p.Race;      
    }
    if (p.Race == "White"){
      white++;
      if (p["Victim's Gender"] == "Male") {
        wMen++;
      } else {
        wWomen++;
      }
    } else {
      nonWhite++;
        if (p["Victim's Gender"] == "Male") {
          nMen++;
        } else {
          nWomen++;
        }
    }
      if($.inArray(race, layers) == -1){                  
         layers.push(race);         
         groups.push(new L.LayerGroup([]))         
      } 

      var index = $.inArray(race, layers);      
      if (p['Hit or Killed?'] == "Killed" ) {        
        
        var circle = new L.circleMarker ([p.lat, p.lng], {color:'red', radius:5})
        circle.addTo(groups[index])
        
    } else {
        
        var circle = new L.circleMarker ([p.lat, p.lng] ,{color:'black', radius:5})
        circle.addTo(groups[index])                                                                                                                                                                     
        
      }
    //console.log(white);
    //console.log(wMen);
    var summary = p.Summary;
    
    circle.bindPopup(summary);  

    
  
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
})
//console.log(layers.toString());
//console.log(groups.toString());
var layer = {
    "Unidentified": groups[0]
  };

for (i = 1; i < layers.length; i++) {
  layer[layers[i]] = groups[i]
}

L.control.layers (null, layer).addTo(map)
$('white').html("<id='w1' value='wMen' />");
$('white').html("<input type='text' id='w2' value='wWomen' />");
$('nonWhite').append("<input type='text' id='table.nonWhite.n1' value='nMen' />");
$('nonWhite').append("<input type='text' id='n2' value='nWomen' />");

}

