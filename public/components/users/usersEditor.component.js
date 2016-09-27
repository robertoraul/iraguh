angular.module('ira.users').component('usersEditor', {
    templateUrl: 'components/users/usersEditor.component.html',
    bindings: {
        user: '<'
    },
    controller: ['$state', '_', 'userPermissionsEnum', 'infoModalService', 'usersService', function ($state, _, userPermissionsEnum, infoModalService, usersService) {
        var $ctrl = this;

        $ctrl.$onInit = () => {
            $ctrl.editing = !!$ctrl.user;
            $ctrl.userPermision = $ctrl.user && $ctrl.user.permission || userPermissionsEnum.ROME;
            usersService.fetch().then(users => $ctrl.users = users);
        };

        function isUserRepeated(users) {
            var isRepeated = _.some(users, item => item._id == $ctrl.user._id || item.email == $ctrl.user.email);
            if (isRepeated) {
                infoModalService.show('En el sistema ya se encuentra registrado un usuario con el mismo usuario o mail');
            }
            return isRepeated;
        }

        $ctrl.save = () => {
            if ($ctrl.userPermision) {
                $ctrl.user.permission = $ctrl.userPermision;
            } else {
                $ctrl.user.permission = userPermissionsEnum.ROME;
            }

            if ($ctrl.editing) {
                if (isUserRepeated(_.filter($ctrl.users, item => item._id != $ctrl.user._id))) {
                    return;
                }
                $ctrl.saving = true;
                return usersService.update($ctrl.user).then(() => $state.go('users.index'));
            }
            if (isUserRepeated($ctrl.users)) {
                return;
            }
            $ctrl.saving = true;
            usersService.save($ctrl.user).then(() => $state.go('users.index'));
        };
    }]
});
