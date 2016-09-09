angular.module('blocks.confirmModal', []).factory('confirmModalService', ['$q', '$http', '$uibModal', function ($q, $http, $uibModal) {
    return {
        show: message => {
            return $uibModal.open({
                templateUrl: 'confirmModal.html',
                resolve: {
                    message: () => message
                },
                controllerAs: '$ctrl',
                controller: ['$uibModalInstance', 'message', function ($uibModalInstance, message) {
                    var $ctrl = this;
                    $ctrl.message = message;
                    $ctrl.accept = $uibModalInstance.close;
                    $ctrl.close = $uibModalInstance.dismiss;
                }]
            }).result;
        }
    };
}]);
