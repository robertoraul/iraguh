angular.module('ira.fira').component('firaEncabezado', {
    templateUrl: 'components/fira/encabezado.component.html',
    bindings: {
        registro: '<'
    },
    controller: ['$state', '_', 'firaService', 'userPermissionsEnum', function ($state, _, firaService, userPermissionsEnum) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  firaService.head().then(header => {
            $ctrl.userPermissionsEnum = userPermissionsEnum;
            $ctrl.admin = header.admin;
            $ctrl.provincia = header.dpe ? header.dpe.provincia : (header.provincia ? header.provincia : null);
            $ctrl.gobierno = header.nombreGL ? header : null;

        });
    }]
});