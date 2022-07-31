/* ============================ */
/* GOOGLE MAPS */
/* ============================ */
if ($('.aheto-map').length) {

  var maps = $('.aheto-map'),
    mapMarkers,
    mapMarkersCount,
    rootUrl = '../index-2.html',
    markers = [],
    infowindow;


  maps.each(function(index) {

    // Get maps parameters
    var mapZoom = parseInt($(this).attr('data-zoom'));
    var mapCenter = new google.maps.LatLng(parseFloat($(this).attr('data-center-lat')), parseFloat($(this).attr('data-center-lng')));
    var mapMarkerImg = ($(this).attr('data-marker-img'));
    var mapMarkerActiveImg = ($(this).attr('data-active-marker-img'));
    if (!mapMarkerActiveImg) mapMarkerActiveImg = mapMarkerImg;


    // Make array of markers
    mapMarkers = [];
    mapMarkersCount = 0;
    while (true) {
      var mapLat = parseFloat($(this).attr('data-lat-' + mapMarkersCount));
      var mapLng = parseFloat($(this).attr('data-lng-' + mapMarkersCount));
      var mapMarkerTitle = $(this).attr('data-title-' + mapMarkersCount);
      var mapMarkerDesc = $(this).attr('data-desc-' + mapMarkersCount);
	    var mapImg = mapMarkerImg;

      markerActive = ($(this).attr('data-active-' + mapMarkersCount) == 'true');

      if (!mapLat | !mapLng | mapMarkersCount > 50) {
        break;
      }
      mapMarkers.push([mapLat, mapLng, mapImg, markerActive, mapMarkerTitle, mapMarkerDesc]);
      mapMarkersCount++;
    }

    // INITIALIZE THIS MAP
    initialize($('.aheto-map')[index], mapMarkers, mapZoom, mapCenter, mapMarkerImg, mapMarkerActiveImg);
  });


  function initialize(map, mapMarkers, zoom, center, markerImg, markerActiveImg) {

    var myOptions = {
      zoom: zoom,
      disableDefaultUI: true,
      scrollwheel: false,
      mapTypeControl: false,
      fullscreenControl: false,
      center: center,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#444444"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "color": "#f2f2f2"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#46bcec"
            },
            {
              "visibility": "on"
            }
          ]
        }
      ]
    }

    map = new google.maps.Map(map, myOptions);

    // Make Markers
    var icon;

    for (var i = 0; i < mapMarkers.length; i++) {
      markers[i] = new google.maps.Marker({
        position: new google.maps.LatLng(mapMarkers[i][0], mapMarkers[i][1]),
        map: map,
        icon: mapMarkers[i][2],
        animation: google.maps.Animation.DROP,
        desc: mapMarkers[i][4]
      });

      // Marker infowindow if marker has title or desc
      markers[i].addListener('click', function() {
        if (infowindow) {
          infowindow.close();
        }
        if ( (this.title) || (this.desc) ) {
          infowindow = new google.maps.InfoWindow({
            content: '<h5>' + this.title + '<h5>' +
            '<p>' + this.desc + '</p>'
          });
          infowindow.open(map, this);
        }
        map.panTo(this.getPosition());
        map.setZoom(14);
      });
    }

    // Marker Hover
    if ($('.google-marker').length) {
      markersHover(map, markers, markerImg, markerActiveImg, zoom);
    }
  }

  function markersHover(map, markers, markerImg, markerActiveImg, zoom) {
    // Change marker image to active image on hover
    for (var i = 0; i < markers.length; i++) {
      google.maps.event.addListener(markers[i], 'mouseover', function() {
        this.setIcon(rootUrl + markerActiveImg);
      });
      google.maps.event.addListener(markers[i], 'mouseout', function() {
        this.setIcon(rootUrl + markerImg);
      });
    }

    // Make page element connected to Google map markers
    $('.google-marker').each(function(index) {

      $(this).attr('data-marger-number', index);

      $(this).mouseover(function() {
        markers[$(this).attr('data-marger-number')].setIcon(rootUrl + markerActiveImg);
      });

      $(this).mouseout(function() {
        markers[$(this).attr('data-marger-number')].setIcon(rootUrl + markerImg);
      });

      $(this).click(function(ev) {

        $([document.documentElement, document.body]).animate({
          scrollTop: $(".aheto-map").offset().top
        }, 1000, function() {console.log('test')});

        if (infowindow) {
          infowindow.close();
        }
        var latLng = markers[$(this).attr('data-marger-number')].getPosition();
        map.setCenter(latLng);
        map.setZoom(14);
        infowindow = new google.maps.InfoWindow({
          content: '<h5>' + markers[$(this).attr('data-marger-number')].title + '<h5>' +
          '<p>' + markers[$(this).attr('data-marger-number')].desc + '</p>'
        });
        infowindow.open(map, markers[$(this).attr('data-marger-number')]);
      });

    });
  }
}