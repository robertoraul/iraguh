angular.module('ira.measures').component('measuresFinder', {
    templateUrl: 'components/measures/measuresFinder.component.html',
    bindings: {
        measureId: '<',
        disabled: '<?',
        onSelect: '&'
    },
    controller: ['$scope', 'measuresService', function ($scope, measuresService) {
        var $ctrl = this;
        $ctrl.$onChanges = changes => {
            if (!changes.measureId) {
                return;
            }
            var measureId = changes.measureId;
            if (!measureId.currentValue || measureId.previousValue == measureId.currentValue) {
                return;
            }
            measuresService.find(measureId.currentValue).then(data => $ctrl.measure = data.measure);
        };
        $ctrl.search = value => measuresService.search(value);
        $ctrl.select = () => {
            if ($ctrl.measure) {
                $ctrl.measureId = $ctrl.measure._id;
            }
            $ctrl.onSelect({measure: $ctrl.measure});
        };
    }]
});
