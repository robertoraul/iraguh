'use strict';

describe('Service: usersService', function () {
    // load the service's module
    beforeEach(module('gpss'));

    var $http,
        usersService;

    beforeEach(inject(function ($httpBackend) {
        $http = $httpBackend;
        jasmine.gpss.setSession($http);
    }));

    beforeEach(inject(function ($injector) {
        usersService = $injector.get('usersService');
    }));

    it('should fetch the users', function () {
        $http.expectGET('/api/users/').respond([
            {_id: 'admin', name: 'Admin', surname: 'Indec'},
            {_id: 'csuar', name: 'Carlos', surname: 'Suarez'},
            {_id: 'abarr', name: 'Ariel', surname: 'Barros'}
        ]);

        var users;
        usersService.fetch().then(data => users = data);

        $http.flush();

        expect(users).toBeDefined();
        expect(users.length).toBe(3);
    });

    it('should find a user by id', function () {
        $http.expectGET('/api/users/csuar').respond({_id: 'csuar', name: 'Carlos', surname: 'Suarez'});

        var user;
        usersService.find('csuar').then(data => user = data);

        $http.flush();

        expect(user).toBeDefined();
        expect(user.name).toBe('Carlos');
    });

    it('should not find a user with invalid an id', function () {
        $http.expectGET('/api/users/non-valid').respond(null);

        var user;
        usersService.find('non-valid').then(data => user = data);

        $http.flush();

        expect(user).toBeNull();
    });

    it('should save a user', function () {
        var user = {_id: 'csuar', name: 'Carlos', surname: 'Suarez'};
        $http.expectPOST('/api/users/', {user: user}).respond();

        usersService.save(user);

        $http.flush();
    });

    it('should update a user', function () {
        var user = {_id: 'admin', name: 'Admin', surname: 'noname'};
        $http.expectPUT('/api/users/admin', {user: user}).respond();

        usersService.update(user);

        $http.flush();
    });

    afterEach(() => $http.verifyNoOutstandingExpectation());
});
