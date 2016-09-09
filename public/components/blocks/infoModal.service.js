angular.module('blocks.infoModal', []).factory('infoModalService', ['$q', '$http', '$uibModal', function ($q, $http, $uibModal) {
    return {
        show: message => {
            return $uibModal.open({
                templateUrl: 'infoModal.html',
                resolve: {
                    message: () => message
                },
                controllerAs: '$ctrl',
                controller: ['$uibModalInstance', 'message', function ($uibModalInstance, message) {
                    var $ctrl = this;
                    $ctrl.message = message;
                    $ctrl.close = $uibModalInstance.close;
                }]
            }).result;
        }
    };
}]);
