'use strict';
/*global google*/

angular.module('travelbotApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  $scope.moduleState = 'survey';
  $scope.places = [];
  $scope.liked = [];
  var index = 0;

  // Pull places from our database
  $http.get('/api/places').success(function(places) {
    $scope.places = places;
    socket.syncUpdates('place', $scope.places);
    shuffle($scope.places);
    $scope.place = $scope.places[0];
  });

  // Generating start map
  var city = {
    name: 'Chicago',
    latitude: 41.8731862,
    longitude: -87.6253513,
    zoom: 13
  };

  var mapOptions = {
      zoom: city.zoom,
      center: new google.maps.LatLng(city.latitude, city.longitude),
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
      $scope.moduleState='itinerary';

    } else {
      $scope.place = $scope.places[index];
    }
  };

  // User has not liked the place
  // Discard
  $scope.toggleDislike = function() {
    index++;
    if (index >= $scope.places.length) {
      $scope.moduleState='itinerary';

    } else {
      $scope.place = $scope.places[index];
    }
  };

  function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  // From our liked array, we will generate a new itinerary, possibly 
  // in our link below
  $scope.itinerary = {
    day1Morning: $scope.places[0]
  };

});
