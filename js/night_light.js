// Initialize as dark mode
let dark_mode=true;

let lightMap=  L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    });

let darkMap=  L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

$(document).on('click', '#night_light', function(){
    if (dark_mode){
      lighter();
      dark_mode=false;    
    }else{
        darker();
        dark_mode=true;
    }
})

function lighter(){
    console.log('Apply light mode');
    $('#night_light_container').html('<img src="images/moon.svg" alt="night_light" id="night_light">')

    //Remove map:
    map.removeLayer(darkMap);

    //Add light map:
    L.tileLayer('https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
    //Change colors:
    styler();
}

function darker(){
    console.log('Apply dark mode')
    $('#night_light_container').html('<img src="images/sun.svg" alt="night_light" id="night_light">')
    
    //Remove map:
    map.removeLayer(lightMap);

    //Add light map:
    L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=3rx62rYMjdB3vYT611QR', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
     //Change colors:
     styler();
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
