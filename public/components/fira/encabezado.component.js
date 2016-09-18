angular.module('ira.fira').component('firaEncabezado', {
    templateUrl: 'components/fira/encabezado.component.html',
    bindings: {
        registro: '<'
    },
    controller: ['$state', '_', '$uibModal', 'infoModalService', 'firaService', function ($state, _, $uibModal, infoModalService, firaService) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  firaService.fetch().then(registros => {
            $ctrl.registros = registros;
            $ctrl.dato = {
                provincia: 'La Pampa',
                codGobLocal: '073455',
                gobLocal: 'Municipalidad de Santa Rosa',
                tipoGobLocal: '???',
                poblacion: 34567
            };
            firaService.fetchVariables().then(variables => $ctrl.variables = variables);
        });

        if ($ctrl.registro) firaService.find($ctrl.registro._id).then(data => {});

    }]
});