angular.module('ira.common').filter('yesNo', [function () {
    return input => {
        if (input === true) {
            return 'Sí';
        }
        if (input === false) {
            return 'No';
        }
        return input;
    };
}]);