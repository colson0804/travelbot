'use strict';


angular.module('travelbotApp')
  .controller('MapCtrl', function ($scope, $http, socket) {
 	
 	$scope.places = [];

    $http.get('/api/places').success(function(places) {
      $scope.places = places;
      socket.syncUpdates('place', $scope.places);
    });

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

    // $scope.markers = [];
    
    // var infoWindow = new google.maps.InfoWindow();
    
    // var createMarker = function (info){
        
    //     var marker = new google.maps.Marker({
    //         map: $scope.map,
    //         position: new google.maps.LatLng(info.lat, info.long),
    //         title: info.name
    //     });
    //     marker.content = '<div class="infoWindowContent">' + info.description + '</div>';
        
    //     google.maps.event.addListener(marker, 'click', function(){
    //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    //         infoWindow.open($scope.map, marker);
    //     });
        
    //     $scope.markers.push(marker);
    // }  
    
    

    // $scope.openInfoWindow = function(e, selectedMarker){
    //     e.preventDefault();
    //     google.maps.event.trigger(selectedMarker, 'click');
    // }
  });
