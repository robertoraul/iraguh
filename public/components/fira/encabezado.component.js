angular.module('ira.fira').component('firaEncabezado', {
    templateUrl: 'components/fira/encabezado.component.html',
    bindings: {
        dpe: '<?',
        rome: '<?',
        registro: '<?'
    },
    controller: ['$state', '_', 'dpesService', 'romesService', function ($state, _, dpesService, romesService) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  {
            if ($ctrl.dpe) {
                dpesService.find($ctrl.dpe).then( dpe => {
                    $ctrl.dpeObj = dpe;
                })
            } else if ($ctrl.rome) {
                romesService.find($ctrl.rome).then( rome => {
                    dpesService.find(rome.dpe).then( dpe => {
                        $ctrl.dpeObj = dpe;
                        $ctrl.romeObj = rome;
                    })
               })
            } else {
                $ctrl.hide = true;
            }
        };

    }]
});