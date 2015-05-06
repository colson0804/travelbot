'use strict';
/*global google*/

angular.module('travelbotApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  
  $scope.places = [];
  $scope.liked = [];
  var index = 0;

  $http.get('/api/places').success(function(places) {
    $scope.places = places;
    socket.syncUpdates('place', $scope.places);
    // Keep track of current place and only display that
    $scope.place = $scope.places[0];
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
  };

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // User has liked the place
  //  Added to $scope.liked array add shift to next place
  //  At end, create itinerary
  $scope.toggleLike = function() {
    $scope.liked.push($scope.place[index]);
    index++;
    if (index >= $scope.places.length) {
      $scope.place = {
        name: 'Done!',
        img: null,
        description: ''
      };

    } else {
      $scope.place = $scope.places[index];
    }
  };

  // User has not liked the place
  // Discard
  $scope.toggleDislike = function() {
    index++;
    if (index >= $scope.places.length) {
      $scope.place = {
        name: 'Done!',
        img: null,
        description: ''
      };

    } else {
      $scope.place = $scope.places[index];
    }
  };

});
