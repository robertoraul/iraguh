/**
 * Created by rcard on 08/09/2016.
 */
angular.module('ira.fira', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('fira', {
            abstract: true,
            url: '/fira',
            template: '<ui-view/>'
        })
        .state('fira.index', {
            url: '',
            template: '<fira/>'
        })
        .state('fira.detalle', {
            url: '/:id',
            template: '<fira-detalle registro="$resolve.registro"/>',
            resolve: {
                registro: ['$stateParams', 'firaService', ($stateParams, firaService) => firaService.find($stateParams.id)]
            }
        })
        .state('fira.new', {
            url: '/new/:id',
            template: '<fira-new registro="$resolve.registro"/>',
            resolve: {
                registro: ['$stateParams', 'firaService', ($stateParams, firaService) => firaService.find($stateParams.id)]
            }
        });
}]);
