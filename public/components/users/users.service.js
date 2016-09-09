angular.module('ira.users').factory('usersService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('/api/users/').then(response => response.data),
        save: user => $http.post('/api/users/', {user: user}).then(angular.noop),
        update: user => $http.put(`/api/users/${user._id}`, {user: user}).then(angular.noop),
        find: id => $http.get(`/api/users/${id}`).then(response => response.data),
        findBranches: () =>  $http.get('/api/users/branches/').then(response => response.data)
    };
}]);
