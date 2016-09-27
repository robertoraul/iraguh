angular.module('ira.fira', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('fira', {
            abstract: true,
            url: '/fira',
            template: '<ui-view/>'
        })
        .state('fira.index', {
            url: '?rome',
            template: '<fira filters="$resolve.filters"/>',
            resolve: {
                filters: ['$stateParams', ($stateParams) => {
                    return $stateParams;
                }]
            }
        })
        .state('fira.detalle', {
            url: '/detalle/:id',
            template: '<fira-detalle registro="$resolve.registro"/>',
            resolve: {
                registro: ['$stateParams', 'firaService', ($stateParams, firaService) => firaService.find($stateParams.id)]
            }
        })
        .state('fira.new', {
            url: '/new',
            template: '<fira-editor/>'
        })
        .state('fira.editor', {
            url: '/:id',
            template: '<fira-editor registro="$resolve.registro"/>',
            resolve: {
                registro: ['$stateParams', 'firaService', ($stateParams, firaService) => firaService.find($stateParams.id)]
            }
        });
}]);
