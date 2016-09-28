angular.module('ira.romes').component('romes', {
    templateUrl: 'components/romes/romes.component.html',
    bindings: {
        filters: '<'
    },
    controller: ['romesService', function (romesService) {
        var $ctrl = this;
        $ctrl.$onInit = () => {
            if ($ctrl.filters) {
                romesService.fetch($ctrl.filters).then(romes => {
                    $ctrl.romes = romes;
                    $ctrl.dpe = $ctrl.filters.dpe;
                });
            }
        };
        $ctrl.delete = (idRome) => {
            alert(String(idRome) + 'db.registros.update{$set: {deleted: true}})')
        };
    }]
});