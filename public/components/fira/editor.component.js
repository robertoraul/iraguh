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
            $ctrl.esNuevo = !$ctrl.registro;
            $ctrl.eligiendoVariable = false;
            firaService.fetchVariables().then(variables => $ctrl.variables = variables);
            if ($ctrl.esNuevo) {
                $ctrl.registro = { variables: [] };
            } else {
                firaService.find($ctrl.registro._id).then(data => {
                    $ctrl.registro = data;
                    $ctrl.registro.fechaAltaReg = new Date($ctrl.registro.fechaAltaReg);
                    $ctrl.registro.fechaBajaReg = new Date($ctrl.registro.fechaBajaReg);
                    $ctrl.registro.fechaModifReg = new Date($ctrl.registro.fechaModifReg);
                });
            }
        });


        $ctrl.save = () => {
            alert('Para no tocar el modelo, todavía no persisto...');
        };

        $ctrl.agregarVariable = () => {
            $uibModal.open({
                component: 'agregarVariable',
                size: 'lg',
                resolve: {
                    variable:  () => $ctrl.variable
                },
            }).result.then(
                variable => $ctrl.registro.variables.push(variable)
            );
        };

        $ctrl.elegirVariable = () => {
            $ctrl.eligiendoVariable = true;
        }

        $ctrl.seleccionarVariable = variable => {
            $ctrl.variable = variable;
            $ctrl.registro.variables.push(variable);
            $ctrl.eligiendoVariable = false;
        };

        $ctrl.editarVariable = variable =>
            $uibModal.open({
                component: 'agregarVariable',
                size: 'lg',
                resolve: {
                    variable:  () => angular.copy(variable)
                },
            }).result.then(
                variableEditada => $ctrl.registro.variables[$ctrl.registro.variables.indexOf(variable)] = variableEditada
            );

        $ctrl.borrarVariable = variable =>  {
            if ($ctrl.registro.variables.length) {
                if ($ctrl.esNuevo) {
                    $ctrl.registro.variables.splice($ctrl.registro.variables.indexOf(variable), 1);
                } else {

                }
            }
        };

        $ctrl.openFechaAlta = () => {
            $ctrl.fechaAltaOpen = true;
        };
        $ctrl.openFechaBaja = () => {
            $ctrl.fechaBajaOpen = true;
        };
        $ctrl.openFechaModif = () => {
            $ctrl.fechaModifOpen = true;
        };
    }]
});