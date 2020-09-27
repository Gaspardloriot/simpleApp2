// Initialize as dark mode
let dark_mode=true;

let lightMap=  L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });

let darkMap=  L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

$(document).on('click', '#night_light', function(){
  $('html').css({'display':'none'});
    if (dark_mode){
      lighter();      
      dark_mode=false;
      changeIssIcons();        
    }else{
        darker();        
        dark_mode=true;
        changeIssIcons();
    }
  setTimeout(function(){
    $('html').css({'display':'block'});
  },350)  
})

function lighter(){
    console.log('Apply light mode');
    $('#night_light_container').html('<img src="images/moon.svg" alt="night_light" id="night_light">')

    //Remove map:
    map.removeLayer(darkMap);

    //Add light map:
    lightMap.addTo(map);
    //Change colors:
    styler();
    if (typeof polygon !== 'undefined'){
    polygon.setStyle({fillColor: '#0000FF', color:'#0000FF'}); 
    }
}


function darker(){
    console.log('Apply dark mode')
    $('#night_light_container').html('<img src="images/sun.svg" alt="night_light" id="night_light">')
    
    //Remove map:
    map.removeLayer(lightMap);

    //Add light map:
    darkMap.addTo(map);
     //Change colors:
     styler();
     if (typeof polygon !== 'undefined'){
        polygon.setStyle({fillColor: '#f0ad4e', color:'#f0ad4e'}); 
        }     
}

function styler(){
    $("#night_light").css({"display": "none"});

    if (dark_mode){
    $('#styles').html(`
                       <link rel="stylesheet" href="css/light/light-styles.css">		
                       <link rel="stylesheet" href="css/light/light-modal.css">`)
    $('#buttoner, #programRun').removeClass('btn-warning').addClass('btn-info');
    }else{
    $('#styles').html(`
                        <link rel="stylesheet" href="css/dark/styles.css">		
                        <link rel="stylesheet" href="css/dark/modal.css">`)    
    $('#buttoner, #programRun').removeClass('btn-info').addClass('btn-warning');
    }
   setTimeout(function(){
    $("#night_light").css({"display": "block"});
   },100) 
}

//ISS icons
function changeIssIcons(){
    if (typeof iss_marker !== 'undefined' && issView==true){
    map.removeLayer(iss_marker)  
    iss_marker= L.marker([iss_coordinates[0], iss_coordinates[1]], {icon: L.icon({
        iconUrl: `images/${(dark_mode ) ? "iss_pin_2" : "iss_pin"}.svg`,
        iconAnchor:   [22, 94], 
        iconSize:     [60, 60]    
    })        
  }).addTo(map);
  iss_marker.bindPopup(popup);
  map.setView(new L.LatLng(iss_coordinates[0], iss_coordinates[1]), 4);              
}
    $('#iss_icon_container').html(`<img src="images/${(dark_mode ) ? "iss_pin_2" : "iss_pin"}.svg" id="iss_pin">`);
    
}
