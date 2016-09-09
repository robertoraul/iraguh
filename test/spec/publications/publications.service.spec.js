'use strict';

describe('Service: publicationsService', function () {
    // load the service's module
    beforeEach(module('gpss'));

    var $http,
        publicationsService;

    beforeEach(inject(function ($httpBackend) {
        $http = $httpBackend;
        jasmine.gpss.setSession($http);
    }));

    beforeEach(inject(function ($injector) {
        publicationsService = $injector.get('publicationsService');
    }));

    it('should fetch the publications', function () {
        $http.expectGET('/api/publications/').respond([
            {_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'},
            {_id: '56c6169451cf303c0fb1dfb0', name: 'Indec Informa', hasPrintVersion: 'No', quantity: '6 meses', deleted: 'Si'},
        ]);

        var publications;
        publicationsService.fetch().then(data => publications = data);

        $http.flush();

        expect(publications).toBeDefined();
        expect(publications.length).toBe(2);
    });

    it('should find a publication by id', function () {
        $http.expectGET('/api/publications/56b09cab88b1f0d412e1af08').respond({_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'});

        var publication;
        publicationsService.find('56b09cab88b1f0d412e1af08').then(data => publication = data);

        $http.flush();

        expect(publication).toBeDefined();
        expect(publication.name).toBe('Anuario 2015');
    });

    it('should not find a publication with invalid an id', function () {
        $http.expectGET('/api/publications/non-valid').respond(null);

        var publication;
        publicationsService.find('non-valid').then(data => publication = data);

        $http.flush();

        expect(publication).toBeNull();
    });

    it('should save a publication', function () {
        var publication =  {_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'};
        $http.expectPOST('/api/publications/', {publication: publication}).respond();

        publicationsService.save(publication);

        $http.flush();
    });

    it('should update a publication', function () {
        var publication =  {_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'};
        $http.expectPUT('/api/publications/56b09cab88b1f0d412e1af08', {publication: publication}).respond();

        publicationsService.update(publication);

        $http.flush();
    });


    afterEach(() => $http.verifyNoOutstandingExpectation());
});

