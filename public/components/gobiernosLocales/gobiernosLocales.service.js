angular.module('ira.gobiernosLocales').factory('gobiernosLocalesService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('api/gobiernosLocales/').then(response => response.data),
        find: code => $http.get(`api/gobiernosLocales/${code}`).then(response => response.data),
        update: () => $http.post('api/gobiernosLocales/indexed', {params: {}}).then(angular.noop())
    };
}]);
