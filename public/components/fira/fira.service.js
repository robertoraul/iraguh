/**
 * Created by rcard on 08/09/2016.
 */
angular.module('ira.fira').factory('firaService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('/api/fira').then(response => response.data)
    };
}]);
