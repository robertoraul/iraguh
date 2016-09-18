angular.module('ira.fira').component('agregarVariable', {
    templateUrl: 'components/fira/agregarVariable.component.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        let $ctrl = this;
        $ctrl.accept = () => $ctrl.close({$value: $ctrl.resolve.variable});
    }
});
