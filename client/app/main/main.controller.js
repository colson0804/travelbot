'use strict';
/*global google*/
/*global alert*/

angular.module('travelbotApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  $scope.moduleState = 'survey';
  $scope.places = [];
  $scope.liked = [];
  $scope.tagCount = {};
  $scope.itinerary = [];
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

    //$scope.itinerary = $scope.places;
  });

  /*******************************************************/
  /* MAP FUNCTIONS                                       */
  /*******************************************************/

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
        $scope.map.panTo(results[0].geometry.location);
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
  //deleteMarkers();
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

 /*******************************************************/
 /* ITINERARY FUNCTIONS                                 */
 /*******************************************************/

  // User has liked the place
  //  Added to $scope.liked array add shift to next place
  //  At end, create itinerary
  $scope.toggleLike = function() {
    
    $scope.liked.push($scope.places[index]);
    $scope.updateTagCount();
    index++;
    if (index >= max_survey) {
      $scope.moduleState='itinerary';
      $scope.createItinerary();
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
      $scope.createItinerary();
    } else {
      $scope.place = $scope.places[index];
      //codeAddress();
    }
  };

  // Increments the tag count for the 'liked' event
  $scope.updateTagCount = function() {
    for (var i=0; i < $scope.place.tags.length; i++) {
      if ($scope.tagCount[$scope.place.tags[i]]) {
        $scope.tagCount[$scope.place.tags[i]]++;
      } else {
        $scope.tagCount[$scope.place.tags[i]] = 1;
      }
    }
  };

  $scope.createItinerary = function() {
    // Generate scores for each event based on tags
    $scope.scoring();

    // Filter out all places with food tags
    var food = $scope.places.filter(function (el) {
      return $scope.contains(el.tags, 'Restaurants/Bars');
    });
    $scope.places = $scope.places.filter(function (el) {
      return !$scope.contains(el.tags, 'Restaurants/Bars');
    });

    // Filter out all places with nightlife.. 
    // (Once we have hours we can do this differently)
    // var nightlife = $scope.places.filter(function (el) {
    //   return $scope.contains(el.tags, 'Nightlife');
    // });

    // Sort out remaining events according to score
    $scope.places.sort(function(a, b) {
      return b.score-a.score;
    });

    // Add nightlife back in

    // Pick top events for tags
    $scope.itinerary[2] = $scope.places.shift();
    $scope.itinerary[7] = $scope.places.shift();
    $scope.itinerary[4] = $scope.places.shift();
    $scope.itinerary[9] = $scope.places.shift();
    $scope.itinerary[0] = $scope.places.shift();
    $scope.itinerary[5] = $scope.places.shift();
    // Select 4 food tags
    $scope.itinerary[3] = food.shift();
    $scope.itinerary[8] = food.shift();
    $scope.itinerary[1] = food.shift();
    $scope.itinerary[6] = food.shift();

  };

  $scope.scoring = function() {
    // Determine a score for each place
    var score, tagName;
    for (var i=0; i<$scope.places.length; i++) {
      score = 0;
      for (var tag in $scope.places[i].tags) {
        tagName = $scope.places[i].tags[tag];
        if ($scope.tagCount[tagName]) {  
          score += $scope.tagCount[tagName];
        }
      }
      $scope.places[i].score = score;
    }
  };

  $scope.contains = function(a, str) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === str) {
            return true;
        }
    }
    return false;
  };


 /*******************************************************/
 /* HELPER FUNCTIONS                                    */
 /*******************************************************/

  // function shuffle(o) {
  //   for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  //   return o;
  // };

});
