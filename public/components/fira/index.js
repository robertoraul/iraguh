angular.module('ira.fira', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('fira', {
            abstract: true,
            url: '/fira',
            template: '<ui-view/>'
        })
        .state('fira.index', {
            url: '?gobierno',
            template: '<fira gobierno="$resolve.gobierno"/>',
            resolve: {
                gobierno: ['$stateParams', 'gobiernosLocalesService', ($stateParams, gobiernosLocalesService) => {
                    if (!$stateParams.gobierno) {
                        return null;
                    }
                    return gobiernosLocalesService.find($stateParams.gobierno).then( data => {
                            return data.codGL;
                        }
                    );
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
