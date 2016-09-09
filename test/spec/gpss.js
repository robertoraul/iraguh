'use strict';

(function () {
    jasmine.gpss = {
        setSession: function ($http) {
            $http.expectGET('/api/users/current').respond([{_id: 'any', name: 'Any', surname: 'User'}]);
        }
    };
})();
