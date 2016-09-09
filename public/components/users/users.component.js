angular.module('ira.users').component('users', {
    templateUrl: 'components/users/users.component.html',
    controller: ['_','usersService', 'userPermissionsEnum', function (_, usersService, userPermissionsEnum) {
        var $ctrl = this;
        $ctrl.userPermissions = userPermissionsEnum;
        $ctrl.$onInit = () => usersService.fetch().then(users => $ctrl.users = users);

        $ctrl.filterUser = user => _.lookup(
            [
                user._id,
                user.name,
                user.surname,
                user.email
            ], $ctrl.searchTerms);
    }]
});
