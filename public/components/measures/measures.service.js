angular.module('ira.measures').factory('measuresService', ['$http', function ($http) {
    return {
        find: id => $http.get(`/api/measures/${id}`).then(response => response.data),
        search: value => $http.get(`/api/measures/search/${value}`).then(response => response.data)
    };
}]);
