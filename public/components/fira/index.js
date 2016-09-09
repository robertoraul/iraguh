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
/*        .state('fira.detalle', {
            url:'/detalle/:id',
            template:'<fira-detalle/>'
        })*/
/*        .state('fira.new', {
            url: '/new',
            template: '<fira-editor/>'
        })*/
/*        .state('fira.editor', {
            url: '/:id',
            template: '<fira-editor user="$resolve.fira"/>',
            resolve: {
                user: ['$stateParams', 'firaService', ($stateParams, firaService) => firaService.find($stateParams.id)]
            }
        });*/
}]);
