'use strict';

describe('Controller: SubscriptionsEditorController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        $q,
        subscription,
        subscriptionsService,
        subscriptionsEditorController,
        subscriptionDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
        var date = new Date();
        subscription = {customer: 'Carlos', package: 'Indec Informa', date};
    }));

    describe('with $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $q = _$q_;
            subscriptionsService = jasmine.createSpyObj('subscriptionsService', ['find', 'update']);

            subscriptionDeferred = $q.defer();
            subscriptionsService.find.and.returnValue(subscriptionDeferred.promise);

            subscriptionsEditorController = $controller('SubscriptionsEditorController', {
                $routeParams: {
                    id: '56b09cab88b1f0d412e1af08'
                },
                subscriptionsService
            });
        }));

        it('should find the subscription on load', function () {
            expect(subscriptionsEditorController.subscription).toBeUndefined();

            subscriptionDeferred.resolve({subscription});
            $rootScope.$digest();

            expect(subscriptionsService.find).toHaveBeenCalledWith('56b09cab88b1f0d412e1af08');
            expect(subscriptionsEditorController.subscription).toBeDefined();
            expect(subscriptionsEditorController.subscription.package).toBe('Indec Informa');
        });

        it('should send the subscription on update', function () {
            subscriptionDeferred.resolve({subscription});
            $rootScope.$digest();

            var updateDeferred = $q.defer();
            subscriptionsService.update.and.returnValue(updateDeferred.promise);

            subscriptionsEditorController.save();

            expect(subscriptionsService.update).toHaveBeenCalledWith(subscriptionsEditorController.subscription);
        });
    });

    describe('without $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            subscriptionsService = jasmine.createSpyObj('subscriptionsService', ['save']);

            subscriptionsEditorController = $controller('SubscriptionsEditorController', {
                subscriptionsService
            });
        }));

        it('should send the subscription on save', function () {
            var saveDeferred = $q.defer();
            subscriptionsService.save.and.returnValue(saveDeferred.promise);

            subscriptionsEditorController.subscription = subscription;
            subscriptionsEditorController.save();

            expect(subscriptionsService.save).toHaveBeenCalledWith(subscription);
        });
    });
});
