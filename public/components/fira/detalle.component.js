angular.module('ira.fira').component('firaDetalle', {
    templateUrl: 'components/fira/detalle.component.html',
    bindings: {
        id: '<'
    },
    controller: ['firaService', function (firaService) {
        var $ctrl = this;
        //harcodeado para traer datos del registro al form.
        //no esta pasando $ctrl.id
        $ctrl.$onInit = () =>  firaService.find('57d2e0220ce18316a858b2e6').then(data => $ctrl.registro = data);

    }]
});