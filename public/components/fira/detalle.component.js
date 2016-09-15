angular.module('ira.fira').component('firaDetalle', {
    templateUrl: 'components/fira/detalle.component.html',
    bindings: {
        registro: '<'
    },
    controller: ['firaService', function (firaService) {
        var $ctrl = this;
        $ctrl.$onInit = () =>  firaService.find($ctrl.registro._id).then(data => {});

    }]
});