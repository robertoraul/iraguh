angular.module('ira').filter('dateFormat', ['$filter', function ($filter) {
    return date => $filter('date')(date, 'dd/MM/yyyy');
}]);
