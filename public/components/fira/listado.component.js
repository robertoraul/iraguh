/**
 * Created by rcard on 09/09/2016.
 */
angular.module('ira.fira').component('fira', {
    templateUrl: 'components/fira/listado.component.html',
    controller: ['firaService', function (firaService) {
        var $ctrl = this;

        $ctrl.$onInit = () => firaService.fetch().then(registros => $ctrl.registros = registros);


    }]
});


