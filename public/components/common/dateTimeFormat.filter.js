angular.module('ira.common').filter('dateTimeFormat', ['$filter', function ($filter) {
    return date => $filter('date')(date, 'dd/MM/yyyy HH:mm');
}]);
