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
  });
