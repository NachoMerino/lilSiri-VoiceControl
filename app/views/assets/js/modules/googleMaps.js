  let initMap = (lat, lng, zoom) => {
    var uluru = { lat: lat, lng: lng };
    //$('.text-box').css('display: block;');
    $('.text-box').append(`<div id="map"></div>`);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  export default initMap;