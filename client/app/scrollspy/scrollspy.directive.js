'use strict';

angular.module('travelbotApp')
  .directive('scrollspy', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        $('#schedule').scrollspy({ target: '#itinNavbar' });
      }
    };
  });