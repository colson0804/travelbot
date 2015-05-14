'use strict';
/*global google*/
/*global alert*/

angular.module('travelbotApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  $scope.moduleState = 'survey';
  $scope.places = [];
  $scope.liked = [];
  var markers = [];
  var index = 0;
  var max_survey = 5;

  // Pull places from our database
  $http.get('/api/places').success(function(places) {
    $scope.places = places;
    socket.syncUpdates('place', $scope.places);
    //shuffle($scope.places);
    $scope.place = $scope.places[0];
    codeAddress();

    $scope.itinerary = $scope.places;
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
  $scope.geocoder = new google.maps.Geocoder();


function codeAddress() {
    //geocoder = new google.maps.Geocoder();
    var address = $scope.place.name + ' in Chicago';
    //console.log(address);
    $scope.geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        addMarker(results[0].geometry.location);
      //console.log("Latitude: "+results[0].geometry.location.lat());
      //console.log("Longitude: "+results[0].geometry.location.lng());
      } 

      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  // Add a marker to the map and push to the array.
function addMarker(location) {
  deleteMarkers();
  var marker = new google.maps.Marker({
    position: location,
    map: $scope.map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


  // User has liked the place
  //  Added to $scope.liked array add shift to next place
  //  At end, create itinerary
  $scope.toggleLike = function() {
    
    $scope.liked.push($scope.place[index]);
    index++;
    if (index >= max_survey) {
      $scope.moduleState='itinerary';

    } else {
      $scope.place = $scope.places[index];
      codeAddress();
    }
  };

  // User has not liked the place
  // Discard
  $scope.toggleDislike = function() {
    index++;
    if (index >= max_survey) {
      $scope.moduleState='itinerary';

    } else {
      $scope.place = $scope.places[index];
      codeAddress();
    }
  };

  // function shuffle(o) {
  //   for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  //   return o;
  // };

});
