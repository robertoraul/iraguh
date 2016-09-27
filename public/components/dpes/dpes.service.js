angular.module('ira.dpes').factory('dpesService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('api/dpes/').then(response => response.data)
    };
}]);
