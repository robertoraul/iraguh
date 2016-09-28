angular.module('ira.variables').component('variableFinder', {
    templateUrl: 'components/variables/variableFinder.component.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        let $ctrl = this;
        $ctrl.accept = () => $ctrl.close({$value: $ctrl.resolve.variable});
        $ctrl.select = variable => {
            if (variable._id) {
                $ctrl.resolve.variable = variable;
                $ctrl.resolve.variable.fechaAltaVariable = new Date($ctrl.resolve.variable.fechaAltaVariable);
                $ctrl.resolve.variable.fechaBajaVariable = new Date($ctrl.resolve.variable.fechaBajaVariable);
                $ctrl.resolve.variable.fechaModificacionVariable = new Date($ctrl.resolve.variable.fechaModificacionVariable);
            } else {
                $ctrl.resolve.variable = { nombreVariable: variable };
            }
        };
    }
});
