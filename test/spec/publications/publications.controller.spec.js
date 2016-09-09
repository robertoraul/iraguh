'use strict';

describe('Controller: PublicationsController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        publications,
        publicationsService,
        publicationsController,
        publicationsDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function () {
        publications = [{_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'}];
    }));

    beforeEach(inject(function (_$rootScope_, $controller, $q) {
        $rootScope = _$rootScope_;

        publicationsService = jasmine.createSpyObj('publicationsService', ['fetch']);
        publicationsDeferred = $q.defer();
        publicationsService.fetch.and.returnValue(publicationsDeferred.promise);

        publicationsController = $controller('PublicationsController', {
            publicationsService
        });
    }));

    it('should fetch the publications on load', function () {
        expect(publicationsController.publications).toBeUndefined();

        publicationsDeferred.resolve(publications);
        $rootScope.$digest();

        expect(publicationsService.fetch).toHaveBeenCalled();
        expect(publicationsController.publications).toBeDefined();
        expect(publicationsController.publications.length).toBe(1);
    });
});

