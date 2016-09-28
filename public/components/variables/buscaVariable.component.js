angular.module('ira.fira').component('buscaVariable', {
    templateUrl: 'components/fira/buscaVariable.component.html',
    bindings: {
        variableId: '=ngModel',
        required: '<ngRequired',
        soloActivos: '<',
        onSelect: '&'
    },
    controller: ['firaService', function (firaService) {
        var $ctrl = this;

        $ctrl.$onChanges = changes => {
            if (!changes.variableId) {
                return;
            }
            var variableId = changes.variableId;
            if (variableId.currentValue != variableId.previousValue) {
                return;
            }
            if ($ctrl.variable && $ctrl.variable._id == variableId.currentValue) {
                return;
            }
            if (!variableId.currentValue) {
                $ctrl.variable = null;
                return;
            }
            firaService.findVariable($ctrl.variableId.currentValue).then(data => {
                if ($ctrl.soloActivos && data.variable.activo) {
                    return;
                }
                $ctrl.variable = data.variable;
            });
        };

        $ctrl.search = value => firaService.searchVariable(value, $ctrl.soloActivos);
        $ctrl.select = () => {
            if ($ctrl.variable) {
                $ctrl.variableId = $ctrl.variable._id;
            }
            $ctrl.onSelect({variable: $ctrl.variable});
        };
    }]
});
