'use strict';
/*global google*/
/*global alert*/

angular.module('travelbotApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
  $scope.moduleState = 'survey';
  $scope.places = [];
  $scope.tagProb = {};
  $scope.itinerary = [];
  var markers = [];
  var index = 0;
  var maxSurvey = 10;
  var itinIndex = 0;

  // Pull places from our database
  $http.get('/api/places').success(function(places) {
    $scope.places = places;
    socket.syncUpdates('place', $scope.places);
    //shuffle($scope.places);
    $scope.food = filterBy('Restaurants/Bars');
    $scope.place = $scope.food.shift();
    codeAddress();
    console.log($scope.place);
  });



  /*******************************************************/
  /* MAP FUNCTIONS                                       */
  /*******************************************************/

  // Generating start map
  var city = {
    name: 'Chicago',
    latitude: 41.8731862,
    longitude: -87.6253513,
    zoom: 14
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
    updateTagProb();
    index++;
    if (index >= maxSurvey) {
      $scope.moduleState = 'itinerary';
      //$scope.createItinerary();
    } else {
      updateItinerary();
      codeAddress();
    }
  };

  // User has not liked the place
  // Discard
  $scope.toggleDislike = function() {
    index++;
    if (index >= maxSurvey) {
      $scope.moduleState = 'itinerary';
      //$scope.createItinerary();
    } else {
      $scope.place = $scope.places[index];
    }
  };

  // Increments the tag count for the 'liked' event
  function updateTagProb() {
    for (var i=0; i < $scope.place.tags.length; i++) {
      if ($scope.tagProb[$scope.place.tags[i]]) {
        $scope.tagProb[$scope.place.tags[i]]++;
      } else if ($scope.place.tags[i] !== '') {
        $scope.tagProb[$scope.place.tags[i]] = 1;
      }
    }
    console.log($scope.tagProb);
  };

  function scoring(arr) {
    // Determine a score for each place
    var score, tagName;
    for (var i=0; i < arr.length; i++) {
      score = 0;
      var tags = arr[i].tags;
      for (var tag in tags) {
        tagName = tags[tag];
        if ($scope.tagProb[tagName]) {  
          score += $scope.tagProb[tagName]*Math.random();
        } else if (!$scope.tagProb[tagName]) {
          score += Math.random()*0.5;
        }
      }
      arr[i].score = score;
    }
    arr.sort(function(a, b) {
      return b.score - a.score;
    });
    return arr;
  };

  function updateItinerary() {
      $scope.itinerary[itinIndex] = $scope.place;
      itinIndex++;

      // update score of every thing
      // If we're adding a normal place
      if (isMeal(itinIndex)) {
        $scope.food = scoring($scope.food);
        
        $scope.place = $scope.food.shift();
      } else {
      // Or if we're adding a food place
        $scope.places = scoring($scope.places);
        $scope.place = $scope.places.shift();
      }
  }



 /*******************************************************/
 /* HELPER FUNCTIONS                                    */
 /*******************************************************/

  function filterBy(tag) {
    var ret = $scope.places.filter(function (el) {
      return contains(el.tags, tag);
    });
    $scope.places = $scope.places.filter(function (el) {
      return !contains(el.tags, tag);
    });
    return ret;
  };

  function contains(a, str) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === str) {
            return true;
        }
    }
    return false;
  };

  function isMeal(index) {
    if (index % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

});
