angular.module('ira.gobiernosLocales', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('gobiernosLocales', {
            abstract: true,
            url: '/gobiernosLocales',
            template: '<ui-view/>'
        });
}]);