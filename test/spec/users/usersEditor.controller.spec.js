'use strict';

describe('Controller: UsersEditorController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        $q,
        user,
        usersService,
        usersEditorController,
        userDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;

        user = {_id: 'csuar', name: 'Carlos', surname: 'Suarez'};
    }));

    describe('with $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $q = _$q_;
            usersService = jasmine.createSpyObj('usersService', ['find', 'update']);

            userDeferred = $q.defer();
            usersService.find.and.returnValue(userDeferred.promise);

            usersEditorController = $controller('UsersEditorController', {
                $routeParams: {
                    id: 'csuar'
                },
                usersService
            });
        }));

        it('should find the user on load', function () {
            expect(usersEditorController.user).toBeUndefined();

            userDeferred.resolve(user);
            $rootScope.$digest();

            expect(usersService.find).toHaveBeenCalledWith('csuar');
            expect(usersEditorController.user).toBeDefined();
            expect(usersEditorController.user.name).toBe('Carlos');
        });

        it('should send the user on update', function () {
            userDeferred.resolve(user);
            $rootScope.$digest();

            var updateDeferred = $q.defer();
            usersService.update.and.returnValue(updateDeferred.promise);

            usersEditorController.save();

            expect(usersService.update).toHaveBeenCalledWith(usersEditorController.user);
        });
    });

    describe('without $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            usersService = jasmine.createSpyObj('usersService', ['save']);

            usersEditorController = $controller('UsersEditorController', {
                usersService
            });
        }));

        it('should send the user on save', function () {
            var saveDeferred = $q.defer();
            usersService.save.and.returnValue(saveDeferred.promise);

            usersEditorController.user = user;
            usersEditorController.save();

            expect(usersService.save).toHaveBeenCalledWith(user);
        });
    });
});
