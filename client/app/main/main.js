'use strict';

angular.module('travelbotApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/index.html',
        controller: 'MainCtrl'
      })
      .when('/makeyouritinerary', {
      	templateUrl: 'app/main/main.html',
      	controller: 'MainCtrl'
      })
      .otherwise({ redirectTo: '/' });
  });