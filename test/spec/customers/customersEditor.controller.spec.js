'use strict';

describe('Controller: CustomersEditorController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        $q,
        customer,
        customersService,
        customersEditorController,
        customerDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;

        customer = {_id: '56b09cab88b1f0d412e1af08', name: 'Carlos'};
    }));

    describe('with $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $q = _$q_;
            customersService = jasmine.createSpyObj('customersService', ['find', 'update']);

            customerDeferred = $q.defer();
            customersService.find.and.returnValue(customerDeferred.promise);

            customersEditorController = $controller('CustomersEditorController', {
                $routeParams: {
                    id: '56b09cab88b1f0d412e1af08'
                },
                customersService
            });
        }));

        it('should find the customer on load', function () {
            expect(customersEditorController.customer).toBeUndefined();

            customerDeferred.resolve({customer});
            $rootScope.$digest();

            expect(customersService.find).toHaveBeenCalledWith('56b09cab88b1f0d412e1af08');
            expect(customersEditorController.customer).toBeDefined();
            expect(customersEditorController.customer.name).toBe('Carlos');
        });

        it('should send the customer on update', function () {
            customerDeferred.resolve({customer});
            $rootScope.$digest();

            var updateDeferred = $q.defer();
            customersService.update.and.returnValue(updateDeferred.promise);

            customersEditorController.save();

            expect(customersService.update).toHaveBeenCalledWith(customersEditorController.customer);
        });
    });

    describe('without $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            customersService = jasmine.createSpyObj('customersService', ['save']);

            customersEditorController = $controller('CustomersEditorController', {
                customersService
            });
        }));

        it('should send the customer on save', function () {
            var saveDeferred = $q.defer();
            customersService.save.and.returnValue(saveDeferred.promise);

            customersEditorController.customer = customer;
            customersEditorController.save();

            expect(customersService.save).toHaveBeenCalledWith(customer);
        });
    });
});

