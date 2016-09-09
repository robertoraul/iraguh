'use strict';

describe('Controller: PublicationsEditorController', function () {
    beforeEach(module('gpss'));

    var $rootScope,
        $q,
        publication,
        publicationsService,
        publicationsEditorController,
        publicationDeferred;

    beforeEach(inject(function ($httpBackend) {
        jasmine.gpss.setSession($httpBackend);
    }));

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;

        publication = {_id: '56b09cab88b1f0d412e1af08', name: 'Anuario 2015', hasPrintVersion: 'Si', quantity: '1 mes', deleted: 'No'};
    }));

    describe('with $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller, _$q_) {
            $q = _$q_;
            publicationsService = jasmine.createSpyObj('publicationsService', ['find', 'update']);

            publicationDeferred = $q.defer();
            publicationsService.find.and.returnValue(publicationDeferred.promise);

            publicationsEditorController = $controller('PublicationsEditorController', {
                $routeParams: {
                    id: '56b09cab88b1f0d412e1af08'
                },
                publicationsService
            });
        }));

        it('should find the publication on load', function () {
            expect(publicationsEditorController.publication).toBeUndefined();

            publicationDeferred.resolve(publication);
            $rootScope.$digest();

            expect(publicationsService.find).toHaveBeenCalledWith('56b09cab88b1f0d412e1af08');
            expect(publicationsEditorController.publication).toBeDefined();
            expect(publicationsEditorController.publication.name).toBe('Anuario 2015');
        });

        it('should send the publication on update', function () {
            publicationDeferred.resolve({publication});
            $rootScope.$digest();

            var updateDeferred = $q.defer();
            publicationsService.update.and.returnValue(updateDeferred.promise);

            publicationsEditorController.save();

            expect(publicationsService.update).toHaveBeenCalledWith(publicationsEditorController.publication);
        });
    });

    describe('without $routeParams', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            publicationsService = jasmine.createSpyObj('publicationsService', ['save']);

            publicationsEditorController = $controller('PublicationsEditorController', {
                publicationsService
            });
        }));

        it('should send the publication on save', function () {
            var saveDeferred = $q.defer();
            publicationsService.save.and.returnValue(saveDeferred.promise);

            publicationsEditorController.publication = publication;
            publicationsEditorController.save();

            expect(publicationsService.save).toHaveBeenCalledWith(publication);
        });
    });
});

