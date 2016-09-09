'use strict';

describe('Controller: SubscriptionsController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        subscriptions,
        subscriptionsService,
        subscriptionsController,
        subscriptionsDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function () {
        subscriptions = [{customer: 'Carlos', package: 'Indec Informa', startDate: '16 feb. 2016'}];
    }));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;

        subscriptionsService = jasmine.createSpyObj('subscriptionsService', ['fetch']);
        subscriptionsDeferred = $q.defer();
        subscriptionsService.fetch.and.returnValue(subscriptionsDeferred.promise);

        subscriptionsController = $controller('SubscriptionsController', {
            subscriptionsService
        });
    }));

    it('should fetch the subscriptions on load', function () {
        expect(subscriptionsController.subscriptions).toBeUndefined();

        subscriptionsDeferred.resolve(subscriptions);
        $rootScope.$digest();

        expect(subscriptionsService.fetch).toHaveBeenCalled();
        expect(subscriptionsController.subscriptions).toBeDefined();
        expect(subscriptionsController.subscriptions.length).toBe(1);
    });
});
