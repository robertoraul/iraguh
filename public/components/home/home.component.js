angular.module('ira.home').component('home', {
    templateUrl: 'components/home/home.component.html',
    bindings: {
        gobierno: '<'
    },
    controller: ['sessionService', function (sessionService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            sessionService.getCurrent().then(user => {
                $ctrl.gobierno = user.codGL || '';
            });
        }
    }]
});
