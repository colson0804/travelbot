'use strict';

describe('Controller: MapCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('travelbotApp'));

  var MapCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapCtrlCtrl = $controller('MapCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
