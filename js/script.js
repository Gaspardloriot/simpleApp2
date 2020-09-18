  //window preloader
  $(window).on('load', function () { 
        if ($('#preloader').length) {                     
            $('#preloader').delay(100).fadeOut('slow', function () {        
                $(this).remove();      
            });    
        }  
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

            console.log(result);
            $('#inputter').val('')

            if (result.status.name == "ok") {
                console.log(result[0].formatted)
                $('#formatted').html('Full address:  ' + result[0].formatted);
                $('#currency').html('Currency:  ' +result[0].annotations.currency.iso_code);
                $('#continent').html('Continent:  ' +result[0].components.continent);
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log('there has been an error mate')
        }
    });
})    