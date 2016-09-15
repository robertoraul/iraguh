angular.module('ira.fira').component('fira', {
    templateUrl: 'components/fira/listado.component.html',
    controller: ['firaService', function (firaService) {
        var $ctrl = this;
        $ctrl.$onInit = () => firaService.fetch().then(data => $ctrl.registros = data);

        $ctrl.delete = (idRegistro) => {
            alert(String(idRegistro) + 'db.registros.update{$set: {deleted: true}})')
        };
    }]
});


