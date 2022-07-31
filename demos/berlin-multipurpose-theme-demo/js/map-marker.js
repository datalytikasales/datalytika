// JavaScript Document

var locations = [
      ['Stepherd\'s Bush', 51.5042, 0.2207, 1],
	  ['Westminister', 51.4986, 0.1339, 2],
	  ['Stratford', 51.5423, 0.0026, 3],
	  ['Southwark', 51.4500, 0.0833, 4],
    ];
	var map;
function test()
{
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < locations.length; i++)
	{  
		var loan = locations[i][0];
		var lat = locations[i][1];
		var llong = locations[i][2];
		var add =  locations[i][3];

		latlngset = new google.maps.LatLng(lat, llong);
		
		var marker = new google.maps.Marker({  
			map: map, title: loan , position: latlngset ,icon: "images/map-icon.png" 
		});
		map.setCenter(marker.getPosition());
		//marker.content = "<h3>Loan Number: " + loan +  '</h3>' + "Address: " + add;
		google.maps.event.addListener(marker,'click', function(map,marker){
			map.infowindow.setContent(marker.content);
			map.infowindow.open(map,marker);
		});
		bounds.extend(marker.getPosition());
	}
	map.fitBounds(bounds);
}
jQuery(document).on('ready', function(e){
	
	var mapOptions = {
			center: new google.maps.LatLng(51.5388,0.1474),
			zoom: 11,
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	map = new google.maps.Map(document.getElementById('gmap'),mapOptions);
	test();
});