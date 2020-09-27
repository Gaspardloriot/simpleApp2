let issView=false;
//ISS coordinates global variable
let iss_coordinates=0;

//iss_popup
const popup = L.popup()
    .setContent("<b>Follow me!!</b><br> I'm the International Space Station,<br> currently zooming at over <b>27.000km/h</em>,</b> 25x the speed of a bullet");

//Getting the location
window.setInterval(function(){
    
    try{
    fetch(`https://api.wheretheiss.at/v1/satellites/25544.json`).then(function (response){
        return response.json();
    })
    .then(function(obj){
        console.log(obj.latitude, obj.longitude)
        let iss_latitude=obj.latitude;
        let iss_longitude=obj.longitude;                
        iss_coordinates=[iss_latitude, iss_longitude];
        console.log(iss_coordinates)
        //Set the marker
        if (issView){
        if (typeof iss_marker !== 'undefined'){
            map.removeLayer(iss_marker) 
           }            
            iss_marker= L.marker([iss_latitude, iss_longitude], {icon: L.icon({
            iconUrl: `images/${(dark_mode ) ? "iss_pin_2" : "iss_pin"}.svg`,            
            iconSize:     [60, 60],
            popupAnchor:  [0, -30]   
        })        
    }).addTo(map);
    iss_marker.bindPopup(popup);
    map.setView(new L.LatLng(iss_coordinates[0], iss_coordinates[1]), 4);     
    }                
    })
}catch(err){
    console.log("data not retrieved", err)
  }
 
}, 10000);

//Toggle the ISS pin visibility:

$(document).on('click', '#iss_pin', issToggle)

function issToggle(){
    if ( iss_coordinates !== 0){
    if (issView){
        issView=false;
        map.removeLayer(iss_marker)
        console.log(issView)
    }else{
        issView=true;
        iss_marker= L.marker([iss_coordinates[0], iss_coordinates[1]], {icon: L.icon({
            iconUrl: `images/${(dark_mode ) ? "iss_pin_2" : "iss_pin"}.svg`,
            iconAnchor:   [22, 94], 
            iconSize:     [60, 60]    
        })        
      }).addTo(map);
      iss_marker.bindPopup(popup);
      map.setView(new L.LatLng(iss_coordinates[0], iss_coordinates[1]), 4);      
        console.log(issView)
    }
}else{
    (issView) ? issView=false : issView=true;
    alert('Retrieving data, retry in 5 seconds')
}
}
 