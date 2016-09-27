angular.module('ira.dpes').component('dpes', {
    templateUrl: 'components/dpes/dpes.component.html',
    controller: ['dpesService', function (dpesService) {
        var $ctrl = this;

        $ctrl.$onInit = () => {
            dpesService.fetch().then(dpes => {
                $ctrl.dpes = dpes
            });
        };

        $ctrl.delete = (idDpe) => {
            alert(String(idDpe) + 'db.dpes.update{$set: {deleted: true}})')
        };
    }]
});