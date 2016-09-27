angular.module('ira.common').directive('ngRole', ['_', 'sessionService', 'userPermissionsEnum', function (_, sessionService, userPermissionsEnum) {
    return {
        restrict: 'A',
        scope: {
            ngRole: '<'
        },
        link: function ($scope, $element) {
            if (!$scope.ngRole) {
                throw new Error('ngRole: A role is required!');
            }
            sessionService.getCurrent().then(user => {
                var userPermission = user.permission;

                if (userPermission == userPermissionsEnum.ADMIN) {
                    return;
                }
                $scope.$watch('ngRole', role => {
                    if (role.permissions && role.permissions.indexOf(userPermission) != -1) {
                        $element.show();
                        return;
                    }

                    $element.hide();
                });
            });
        }
    };
}]);
