angular.module('ira.dpes', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('dpes', {
            abstract: true,
            url: '/dpes',
            template: '<ui-view/>'
        })
        .state('dpes.index', {
            url: '',
            template: '<dpes/>'
        });
}]);
