angular.module('ira').run(['$rootScope', '$log', function ($rootScope, $log) {
    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => $log.error(error)
    );
}]);
