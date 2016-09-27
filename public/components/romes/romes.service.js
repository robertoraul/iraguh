angular.module('ira.romes').factory('romesService', ['$http', function ($http) {
    return {
        fetch: filters => $http.get('api/romes/', {params: filters}).then(response => response.data)
    };
}]);