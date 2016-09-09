'use strict';

describe('Controller: UsersController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        users,
        usersService,
        usersController,
        usersDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function () {
        users = [{_id: 'admin', name: 'Admin', surname: 'Indec'}];
    }));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;

        usersService = jasmine.createSpyObj('usersService', ['fetch']);
        usersDeferred = $q.defer();
        usersService.fetch.and.returnValue(usersDeferred.promise);

        usersController = $controller('UsersController', {
            usersService
        });
    }));

    it('should fetch the users on load', function () {
        expect(usersController.users).toBeUndefined();

        usersDeferred.resolve(users);
        $rootScope.$digest();

        expect(usersService.fetch).toHaveBeenCalled();
        expect(usersController.users).toBeDefined();
        expect(usersController.users.length).toBe(1);
    });
});
