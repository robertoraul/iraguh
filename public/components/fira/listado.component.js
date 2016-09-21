angular.module('ira.fira').component('fira', {
    templateUrl: 'components/fira/listado.component.html',
    bindings: { gobierno: '<' },
    controller: ['sessionService', 'firaService', function (sessionService, firaService) {
        var $ctrl = this;

        $ctrl.$onInit = () => {
            firaService.fetch().then(registros => {
                $ctrl.registros = registros
            });

                /*
                 sessionService.getCurrent().then(user => {
                     $ctrl.gobierno = user.codGL || '';

                     if ($ctrl.gobierno) {
                        firaService.filter($ctrl.gobierno).then(registros => {
                            $ctrl.registros = registros
                        });
                    } else {
                        firaService.fetch().then(registros => $ctrl.registros = registros);
                    }
                 });
*/



        };

        $ctrl.delete = (idRegistro) => {
            alert(String(idRegistro) + 'db.registros.update{$set: {deleted: true}})')
        };
    }]
});