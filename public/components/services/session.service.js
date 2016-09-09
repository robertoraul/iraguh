angular.module('ira').factory('sessionService', ['$q', '$http', function ($q, $http) {
    var user = null;

    function loadCurrentUser() {
        return $http.get('api/users/current').then(response => user = response.data);
    }

    user = loadCurrentUser();
    return {
        getCurrent: () => $q.when(user)
    };
}]);
