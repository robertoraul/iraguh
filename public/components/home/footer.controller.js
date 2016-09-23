angular.module('ira').controller('footerController', ['sessionService', function (sessionService) {
    var vm = this;
    sessionService.getCurrent().then(user => {
        vm.user = user;
        vm.role = user.permissions;
    });
}]);
