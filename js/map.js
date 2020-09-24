//Getting current location of user if possible:
//defining lat & lng variables:
let curLat= false;
let curLong=false;
$(window).on('load',function(){          
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){            
            curLat=position.coords.latitude;
            curLong=position.coords.longitude;                  
            map.setView(new L.LatLng(curLat, curLong), 5)           
            map.fireEvent('click',{latlng:[curLat,curLong]})            
        });
    }else{      
    }  
})


//Initializing the map
const map= L.map('map')	.setView([curLong,curLat], 5);


//Initializing the tiles
const token='pk.eyJ1IjoiZ2FzcGFyZGxvcmlvdCIsImEiOiJja2Zhc2I4cHkwcW5lMnlweGxlZnNqNWN4In0.C7yofBWa-Y2OeSw0wck7BA'
L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=dRTBtEkpltsvNk3jVv3t', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);


//Map clicking functionalities
map.on('click', function(e){    
    const coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;   
    let toString= `${lat}, ${lng}`;
    if(typeof lat === 'undefined' || typeof lng === 'undefined'){
      toString = `${curLat}, ${curLong}`;
      lat=curLat;
      lng=curLong;
    }
    
    $.ajax({
        url: "php/main.php",
        type: 'POST',
        dataType: 'json',
        data: {
            address: toString
        },
        

        success: function(result) {                        
            if (result.status.name == "ok") {
                //Set view appropriately
                map.setView(new L.LatLng(lat, lng), 4);
                //Sort data appropriately
                if (lat==curLat&&lng==curLong){
                    $('#formatted').html('<em>Current Location:</em>  ' + result[0].formatted); 
                }else{
                    $('#formatted').html('<em>Full address:</em>  ' + result[0].formatted);
                }
                $('#country').html(result[0].components.country)
                const currencyCode=result[0].annotations.currency.iso_code;
                $('#currency').html('<em>Currency:</em>  ' +currencyCode);
                $('#continent').html('<em>Continent:</em>  ' +result[0].components.continent);
                $('#capital').html(`<em>Capital:</em>  ${result.country_info[0].capital}`);
                $('#population').html(`<em>Population:</em>  ${result.country_info[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
                $('#coordinates').html(` 
                                        <ol type="i"><em>Coordinates:</em>
                                          <li>latitude: ${result[0].geometry.lat}</li>
                                          <li>longitude: ${result[0].geometry.lng}</li>
                                        </ol>`);
                $('#currency_sign').html(`<em>Sign:</em>  ${result.country_info[0].currencies[0].symbol}`);
                $('#currency_rate').html(`<em>Rate:</em>  ${result.exchange_rate.rates[`${currencyCode}`]}`);
                $('#temperature').html(`<em>Temperature:</em>  ${Math.round(result.weather.main.temp-273.15)} C°`);
                $('#weather_description').html(`<em>Description:</em>  ${result.weather.weather[0].description}`);
                $('#country_flag').html(`<img src=${result.country_info[0].flag} alt="Country flag">`)
                $('#error_message').css({'display':'none'})
                $('#modal-data').css({'display':'block'})
                
                
                //Adding borders:                
                countryCode= result[0].components['ISO_3166-1_alpha-3'];                
                //fetching border polygon
                fetch(`vendors/country-borders/${countryCode}.json`).then(function (response){
                    return response.json();
                })
                .then(function(obj){                                        
                    if (typeof polygon !== 'undefined'){
                        map.removeLayer(polygon) 
                    }
                    polygon = L.polygon(obj).addTo(map);
                    if (typeof marker !== 'undefined'){
                        map.removeLayer(marker) 
                       }                                
                    marker = L.marker([lat, lng]).addTo(map);                    
                    $('#buttoner').trigger('click');
                })
                .catch(function (error){
                    errorHandler();
                })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            errorHandler();    
        }
    }); 
});

//Event handler: POST to PHP
$('#programRun').click(function(){    
  
    $.ajax({
        url: "php/main.php",
        type: 'POST',
        dataType: 'json',
        data: {
            address: $('#inputter').val(),            
        },
        success: function(result) {    
            $('#inputter').val('')

            if (result.status.name == "ok") {
                const coord= result[0].geometry;
                map.setView(new L.LatLng(coord.lat, coord.lng), 4);
                $('#formatted').html('<em>Full address:</em>  ' + result[0].formatted);
                $('#country').html(result[0].components.country)
                const currencyCode=result[0].annotations.currency.iso_code;
                $('#currency').html('<em>Currency:</em>  ' +currencyCode);
                $('#continent').html('<em>Continent:</em>  ' +result[0].components.continent);
                $('#capital').html(`<em>Capital:</em>  ${result.country_info[0].capital}`);
                $('#population').html(`<em>Population:</em>  ${result.country_info[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`);
                $('#coordinates').html(` 
                                        <ol type="i"><em>Coordinates:</em>
                                          <li>latitude: ${result[0].geometry.lat}</li>
                                          <li>longitude: ${result[0].geometry.lng}</li>
                                        </ol>`);
                $('#currency_sign').html(`<em>Sign:</em>  ${result.country_info[0].currencies[0].symbol}`);
                $('#currency_rate').html(`<em>Rate:</em>  ${result.exchange_rate.rates[`${currencyCode}`]}`);
                $('#temperature').html(`<em>Temperature:</em>  ${Math.round(result.weather.main.temp-273.15)} C°`);
                $('#weather_description').html(`<em>Description:</em>  ${result.weather.weather[0].description}`);
                $('#country_flag').html(`<img src=${result.country_info[0].flag} alt="Country flag">`);
                $('#error_message').css({'display':'none'});
                $('#modal-data').css({'display':'block'});
                 //Adding borders:                
                 countryCode= result[0].components['ISO_3166-1_alpha-3'];                                                 
                 //fetching border polygon
                 fetch(`vendors/country-borders/${countryCode}.json`).then(function (response){
                     return response.json();
                 }).then(function(obj){                                         
                     if (typeof polygon !== 'undefined'){
                         map.removeLayer(polygon) 
                        }
                      polygon = L.polygon(
                        obj
                     ).addTo(map);
                     if (typeof marker !== 'undefined'){
                        map.removeLayer(marker) 
                       }                    
                      marker = L.marker([coord.lat, coord.lng]).addTo(map); 
                      $('#buttoner').trigger('click');
                 }).catch(function (error){  
                     errorHandler();
                    })
            }
 
         },
         error: function(jqXHR, textStatus, errorThrown) {
             // your error code
             errorHandler();             
            }
     }); 
 });

function errorHandler(){
    $('#country_flag').html(`<img src="images/warning.svg" alt="error message">`);
    $('#country').html('OOPS...!')
    $('#error_message').css({'display':'block'})
    $('#modal-data').css({'display':'none'})
    $('#buttoner').trigger('click')      
}



 
              