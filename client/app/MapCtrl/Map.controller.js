'use strict';


angular.module('travelbotApp')
  .controller('MapCtrl', function ($scope) {
  	$scope.places = [
		{
			name: 'Cloud gate',
			img: 'assets/images/cloudgate800.jpg',
			description: 'Cloud Gate is a public sculpture by Indian-born British artist Anish Kapoor, that is the ' +
				'centerpiece of AT&T Plaza at Millennium Park in the Loop community area of Chicago, Illinois. ' +
				'The sculpture and AT&T Plaza are located on top of Park Grill, between the Chase Promenade and ' +
				'McCormick Tribune Plaza & Ice Rink. Constructed between 2004 and 2006, the sculpture is nicknamed ' +
				'The Bean because of its bean-like shape. Made up of 168 stainless steel plates welded together, ' +
				'its highly polished exterior has no visible seams. It measures 33 by 66 by 42 feet (10 by 20 by 13 m), ' +
				'and weighs 110 short tons (100 t; 98 long tons).'
		}
	];

  	var cities = [{
  		name: 'Chicago',
  		latitude: 41.8731862,
  		longitude: -87.6253513,
  		zoom: 13
  	}];

    var mapOptions = {
        zoom: cities[0].zoom,
        center: new google.maps.LatLng(cities[0].latitude, cities[0].longitude),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    // var createMarker = function (info){
        
    //     var marker = new google.maps.Marker({
    //         map: $scope.map,
    //         position: new google.maps.LatLng(info.lat, info.long),
    //         title: info.city
    //     });
    //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
    //     google.maps.event.addListener(marker, 'click', function(){
    //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    //         infoWindow.open($scope.map, marker);
    //     });
        
    //     $scope.markers.push(marker);
        
    // }  
    
    // for (var i = 0; i < cities.length; i++){
    //     createMarker(cities[i]);
    // }

    // $scope.openInfoWindow = function(e, selectedMarker){
    //     e.preventDefault();
    //     google.maps.event.trigger(selectedMarker, 'click');
    // }
  });
