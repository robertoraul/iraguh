angular.module('ira.romes', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('romes', {
            abstract: true,
            url: '/romes',
            template: '<ui-view/>'
        })
        .state('romes.index', {
            url: '?dpe',
            template: '<romes filters="$resolve.filters"/>',
            resolve: {
                filters: ['$stateParams', ($stateParams) => {
                    return $stateParams;
                }]
            }
        });
}]);
