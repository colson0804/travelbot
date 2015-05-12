'use strict';

describe('Directive: scrollspy', function () {

  // load the directive's module
  beforeEach(module('travelbotApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scrollspy></scrollspy>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollspy directive');
  }));
});