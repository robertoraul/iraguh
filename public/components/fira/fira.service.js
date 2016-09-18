angular.module('ira.fira').factory('firaService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('api/fira/').then(response => response.data),
        fetchVariables: () => $http.get('api/fira/variables').then(response => response.data),
        find: id => $http.get(`api/fira/${id}`).then(response => response.data),
        findVariable: id => $http.get(`api/fira/variable/${id}`).then(response => response.data),
        searchVariable: (value, soloActivos) => $http.get(`api/fira/variables/search/${value}`, {
            params: {soloActivos}
        }).then(response => response.data)
    };
}]);
