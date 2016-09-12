/**
 * Created by rcard on 08/09/2016.
 */
angular.module('ira.fira').factory('firaService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('/api/fira').then(response => response.data)
/*        save: user => $http.post('/api/users/', {user: user}).then(angular.noop),
        update: user => $http.put(`/api/users/${user._id}`, {user: user}).then(angular.noop),
        find: id => $http.get(`/api/users/${id}`).then(response => response.data),
        findBranches: () =>  $http.get('/api/users/branches/').then(response => response.data)*/
    };
}]);
