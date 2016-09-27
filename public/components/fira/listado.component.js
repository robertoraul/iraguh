angular.module('ira.fira').component('fira', {
    templateUrl: 'components/fira/listado.component.html',
    bindings: {
        filters: '<'
    },
    controller: ['firaService', function (firaService) {
        var $ctrl = this;

        $ctrl.$onInit = () => {
            if ($ctrl.filters) {
                firaService.fetch($ctrl.filters).then(registros => {
                    $ctrl.registros = registros
                });
            }
        };

        $ctrl.delete = (idRegistro) => {
            alert(String(idRegistro) + 'db.registros.update{$set: {deleted: true}})')
        };
    }]
});