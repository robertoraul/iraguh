angular.module('ira.fira').component('firaEditor', {
    templateUrl: 'components/fira/editor.component.html',
    bindings: {
        registro: '<'
    },
    controller: ['$state', '_', '$uibModal', 'infoModalService', 'firaService', function ($state, _, $uibModal, infoModalService, firaService) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  firaService.fetch().then(registros => {
            $ctrl.fechaAltaOpen = false;
            $ctrl.fechaBajaOpen = false;
            $ctrl.fechaModificacionOpen = false;
            $ctrl.registros = registros;
            firaService.fetchVariables().then(variables => $ctrl.variables = variables);
        });

        if ($ctrl.registro) firaService.find($ctrl.registro._id).then(data => {
            $ctrl.registro = data;
            $ctrl.registro.fechaAltaReg = new Date($ctrl.registro.fechaAltaReg);
        });

        $ctrl.openFechaAlta = () => {
            $ctrl.fechaAltaOpen = true;
        };
    }]
});