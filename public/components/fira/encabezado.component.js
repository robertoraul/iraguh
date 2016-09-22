angular.module('ira.fira').component('firaEncabezado', {
    templateUrl: 'components/fira/encabezado.component.html',
    bindings: {
        registro: '<'
    },
    controller: ['$state', '_', 'sessionService', 'gobiernosLocalesService', function ($state, _, sessionService, gobiernosLocalesService) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  sessionService.getCurrent().then(user => {
            $ctrl.cod = user.codGL || '';
            gobiernosLocalesService.find($ctrl.cod).then(gobierno =>
                $ctrl.gobierno = gobierno
            );
        });
    }]
});