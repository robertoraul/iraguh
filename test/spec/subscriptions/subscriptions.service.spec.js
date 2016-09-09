'use strict';

describe('Service: subscriptionsService', function () {
    // load the service's module
    beforeEach(module('gpss'));

    var $http,
        subscriptionsService;

    beforeEach(inject(function ($httpBackend) {
        $http = $httpBackend;
        jasmine.gpss.setSession($http);
    }));

    beforeEach(inject(function ($injector) {
        subscriptionsService = $injector.get('subscriptionsService');
    }));

    it('should fetch the subscriptions', function () {
        $http.expectGET('/api/subscriptions/').respond([
            {customer: 'Carlos', package: 'Indec Informa', startDate: '16 feb. 2016'},
            {customer: 'Admin', package: 'Anuario 2015', startDate: '3 mar. 2016'}
        ]);

        var subscriptions;
        subscriptionsService.fetch().then(data => subscriptions = data);

        $http.flush();

        expect(subscriptions).toBeDefined();
        expect(subscriptions.length).toBe(2);
    });

    it('should find a subscription by id', function () {
        $http.expectGET('/api/subscriptions/56b09cab88b1f0d412e1af08').respond({customer: 'Carlos', package: 'Indec Informa', startDate: '16 feb. 2016'});

        var subscription;
        subscriptionsService.find('56b09cab88b1f0d412e1af08').then(data => subscription = data);

        $http.flush();

        expect(subscription).toBeDefined();
        expect(subscription.package).toBe('Indec Informa');
    });

    it('should not find a subscription with invalid an id', function () {
        $http.expectGET('/api/subscriptions/non-valid').respond(null);

        var subscription;
        subscriptionsService.find('non-valid').then(data => subscription = data);

        $http.flush();

        expect(subscription).toBeNull();
    });

    it('should save a subscription', function () {
        var subscription =  {customer: 'Carlos', package: 'Indec Informa', startDate: '16 feb. 2016'};
        $http.expectPOST('/api/subscriptions/', {subscription: subscription}).respond();

        subscriptionsService.save(subscription);

        $http.flush();
    });

    it('should update a subscription', function () {
        var subscription =  {customer: 'Carlos', package: 'Indec Informa', startDate: 'noname'};
        $http.expectPUT('/api/subscriptions/undefined', {subscription: subscription}).respond();

        subscriptionsService.update(subscription);

        $http.flush();
    });


    afterEach(() => $http.verifyNoOutstandingExpectation());
});
