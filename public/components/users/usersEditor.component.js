angular.module('ira.users').component('usersEditor', {
    templateUrl: 'components/users/usersEditor.component.html',
    bindings: {
        user: '<'
    },
    controller: ['$state', '_', 'userPermissionsEnum', 'branchPermissionsEnum', 'infoModalService', 'usersService', function ($state, _, userPermissionsEnum, branchPermissionsEnum, infoModalService, usersService) {
        var $ctrl = this;
        $ctrl.branchPermission = branchPermissionsEnum.CAN_READ;
        $ctrl.branchPermissions = branchPermissionsEnum;

        $ctrl.$onInit = () => {
            $ctrl.editing = !!$ctrl.user;
            usersService.fetch().then(users => $ctrl.users = users);
            usersService.findBranches().then(branches => {
                $ctrl.branches = branches;
                if ($ctrl.editing) {
                    if ($ctrl.user.permissions && $ctrl.user.permissions[0] == userPermissionsEnum.USER_ADMIN) {
                        $ctrl.userPermision = true;
                    }
                    if (!$ctrl.user.branches) {
                        $ctrl.user.branches = [];
                    } else {
                        $ctrl.user.branches = _.map($ctrl.user.branches, branchPermission => {
                            var branch = _.find($ctrl.branches, {_id: branchPermission.branch});
                            return {
                                branch: branchPermission.branch,
                                permission: branchPermission.permission,
                                name: branch.name,
                                place: branch.place
                            };
                        });
                    }
                } else {
                    $ctrl.user = {
                        branches: []
                    };
                }
            });
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
                $ctrl.user.permissions = [userPermissionsEnum.USER_ADMIN];
            } else {
                $ctrl.user.permissions = [userPermissionsEnum.USER];
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
        $ctrl.addBranchPermission = () => {
            if ($ctrl.branch) {
                var isRepeated = _.some($ctrl.user.branches, {branch: $ctrl.branch._id});
                if (isRepeated) {
                    return;
                }

                if ($ctrl.branchPermission == $ctrl.branchPermissions.CAN_WRITE) {
                    var hasWriteBranchPermission = _.some($ctrl.user.branches, {permission: $ctrl.branchPermissions.CAN_WRITE});
                    if (hasWriteBranchPermission) {
                        return infoModalService.show('No puede pertencer a más de un sector');
                    }
                }
                $ctrl.user.branches.push({
                    branch: $ctrl.branch._id,
                    name: $ctrl.branch.name,
                    place: $ctrl.branch.place,
                    permission: $ctrl.branchPermission
                });
            }
        };
        $ctrl.removeBranchPermission = index => $ctrl.user.branches.splice(index, 1);
    }]
});
