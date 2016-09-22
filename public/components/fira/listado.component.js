angular.module('ira.fira').component('fira', {
    templateUrl: 'components/fira/listado.component.html',
    bindings: { gobierno: '<' },
    controller: ['sessionService', 'firaService', 'gobiernosLocalesService', function (sessionService, firaService, gobiernosLocalesService) {
        var $ctrl = this;

        $ctrl.$onInit = () => {
            firaService.fetch().then(registros => {
                $ctrl.registros = registros
            });
        };

        $ctrl.delete = (idRegistro) => {
            alert(String(idRegistro) + 'db.registros.update{$set: {deleted: true}})')
        };
    }]
});