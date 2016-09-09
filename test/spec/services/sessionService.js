'use strict';

describe('Service: sessionService', function () {
    // load the service's module
    beforeEach(module('gpss'));

    var $http;
    beforeEach(inject(function ($httpBackend) {
        $http = $httpBackend;
    }));

    it('should fetch the session on page load', function () {
        $http.expectGET('/api/users/current').respond([{_id: 'admin', name: 'Admin', surname: 'Indec'}]);
    });

    afterEach(() => $http.verifyNoOutstandingExpectation());
});
