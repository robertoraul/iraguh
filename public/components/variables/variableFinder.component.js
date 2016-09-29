angular.module('ira.variables').component('variableFinder', {
    templateUrl: 'components/variables/variableFinder.component.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        let $ctrl = this;
        $ctrl.accept = () => {
            $ctrl.resolve.variable.description.measure = $ctrl.measure;
            $ctrl.close({$value: $ctrl.resolve.variable})
        };
        $ctrl.selectMeasure = measure => $ctrl.measure = measure;
    }

});
