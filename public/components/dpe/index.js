angular.module('ira.dpe', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('dpe', {
            abstract: true,
            url: '/dpe',
            template: '<ui-view/>'
        })
        .state('dpe.index',{
            url: '/dpe/listado/:codGl',
            template: '<dpe-component/>',
            resolve: {
                gobiernos: ['$stateParams', 'dpeService', ($stateParams, dpeService) => dpeService.find($stateParams.codGl)]
            }
        })

}]);
