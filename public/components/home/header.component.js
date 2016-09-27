angular.module('ira.home').component('header', {
    templateUrl: 'components/home/header.component.html',
    controller: ['$scope', '$location', 'userPermissionsEnum', 'sessionService', function ($scope, $location, userPermissionsEnum, sessionService) {
        var $ctrl = this;

            $ctrl.userPermissionsEnum = userPermissionsEnum;

            $ctrl.collapsed = true;
            $scope.$on('$locationChangeSuccess', () => {
                $ctrl.location = $location.path()
            });

    }]
});
