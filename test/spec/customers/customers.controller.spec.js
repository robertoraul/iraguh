'use strict';

describe('Controller: CustomersController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        customers,
        customersService,
        customersController,
        customersDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function () {
        customers = [{_id: '56b09cab88b1f0d412e1af08', name: 'Carlos'}];
    }));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;

        customersService = jasmine.createSpyObj('customersService', ['fetch']);
        customersDeferred = $q.defer();
        customersService.fetch.and.returnValue(customersDeferred.promise);

        customersController = $controller('CustomersController', {
            customersService
        });
    }));

    it('should fetch the customers on load', function () {
        expect(customersController.customers).toBeUndefined();

        customersDeferred.resolve(customers);
        $rootScope.$digest();

        expect(customersService.fetch).toHaveBeenCalled();
        expect(customersController.customers).toBeDefined();
        expect(customersController.customers.length).toBe(1);
    });
});

