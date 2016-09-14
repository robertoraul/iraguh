angular.module('ira.fira').factory('firaService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('api/fira/').then(response => response.data),
        find: id => $http.get(`api/fira/${id}`).then(response => response.data)
    };
}]);
