//window preloader
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
        });
    }
});

const coordinates= [
  [
    55.7514952,
    37.6181531
  ],
  [
    46.603354,
    1.8883335
  ],
  [
    51.5073219,
    -0.1276474
  ],
  [
    -22.9110137,
    -43.2093727
  ],
  [
    35.6645956,
    139.6987107
  ]
]

$('#buttoner').click(chooseToggle)
$('.X').click(ModalCloser)
$('#map').click(modalToggle)
$('#programRun').click(modalToggle)
$('#main_icon').click(mapTrigger)
$('#phone-search').click(toggleSearchbar)

let toggle=false;
function Modalopener(){
  $('#modal-parent').css({'display':'block'})
  $('#modal').css({'animation':'0.7s drop'})
  toggle=true;
}

function ModalCloser(){
  $('#modal').css({'animation':'0.6s slide'})
  setTimeout(function(){
    $('#modal-parent').css({'display':'none'})
  }, 450);
  toggle=false;
}

function modalToggle(){
  if(toggle){
    $('#modal').css({'animation':'0.5s toggle'})
    setTimeout(function(){
      $('#modal-parent').css({'display':'none'})
    }, 350);
  }
  toggle=true;
}

function chooseToggle(){
  
  if ($('#modal-parent').css({'display':'none'})){
    Modalopener()
  }else{
    ModalCloser() 
  }
}

function mapTrigger(){
  const randomCoordinates=Math.floor(Math.random() * 4);
  map.fireEvent('click', {
    latlng: L.latLng(coordinates[randomCoordinates][0], coordinates[randomCoordinates][1])
  })
  setTimeout(4000);  

}

let toggleSearch=true;
function toggleSearchbar(){
  if (toggleSearch){
    setTimeout(function(){
      $('h1').css({'max-width': '100%'}); 
    },200)
$('#inputter').css({'max-width': '0px'});
$('#programRun').css({'display': 'none'});
setTimeout(function(){
  $('#inputter').css({'display':'none'})
 }, 150);
toggleSearch=false; 
 }else{
  $('h1').css({'max-width': '40px'});
  $('#inputter').css({'max-width': '180px'});  
    setTimeout(function(){
      $('#programRun').css({'display': 'block'});
      $('#inputter').css({'display':'block'})         
   }, 350);
  toggleSearch=true;
 }
}

/*$( window ).on( "orientationchange", function( event ) {
  if ($(window).height() <=450){
  $('#inputter').css({'display':'block', 'max-width': '180px'});
   $('#programRun').css({'display': 'block'});
  $('h1').css({'max-width':'100%'})
  }else{
    $('h1').css({'max-width':'40px'});
  } 
});*/