'use strict';

describe('Service: customersService', function () {
    // load the service's module
    beforeEach(module('gpss'));

    var $http,
        customersService;

    beforeEach(inject(function ($httpBackend) {
        $http = $httpBackend;
        jasmine.gpss.setSession($http);
    }));

    beforeEach(inject(function ($injector) {
        customersService = $injector.get('customersService');
    }));

    it('should fetch the customers', function () {
        $http.expectGET('/api/customers/').respond([
            {_id: '56b09cab88b1f0d412e1af08', name: 'Carlos'},
            {_id: '56c6169451cf303c0fb1dfb0', name: 'Admin'},
            {_id: '56c61a1d86ee576011faaa5e', name: 'Juan'}
        ]);

        var customers;
        customersService.fetch().then(data => customers = data);

        $http.flush();

        expect(customers).toBeDefined();
        expect(customers.length).toBe(3);
    });

    it('should find a customer by id', function () {
        $http.expectGET('/api/customers/56b09cab88b1f0d412e1af08').respond({name: 'Carlos'});

        var customer;
        customersService.find('56b09cab88b1f0d412e1af08').then(data => customer = data);

        $http.flush();

        expect(customer).toBeDefined();
        expect(customer.name).toBe('Carlos');
    });

    it('should not find a customer with invalid an id', function () {
        $http.expectGET('/api/customers/non-valid').respond(null);

        var customer;
        customersService.find('non-valid').then(data => customer = data);

        $http.flush();

        expect(customer).toBeNull();
    });

    it('should save a customer', function () {
        var customer =  {_id: '56b09cab88b1f0d412e1af08', name: 'Carlos'};
        $http.expectPOST('/api/customers/', {customer: customer}).respond();

        customersService.save(customer);

        $http.flush();
    });

    it('should update a customer', function () {
        var customer =  {_id: '56b09cab88b1f0d412e1af08', name: 'Carlos'};
        $http.expectPUT('/api/customers/56b09cab88b1f0d412e1af08', {customer: customer}).respond();

        customersService.update(customer);

        $http.flush();
    });


    afterEach(() => $http.verifyNoOutstandingExpectation());
});

