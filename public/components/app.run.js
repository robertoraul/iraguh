angular.module('ira').run(['$http', '$window', 'sessionService', function ($http, $window, sessionService) {
    sessionService.getCurrent().then(
        user => $http.defaults.headers.common.Authorization = `Basic ${$window.btoa(user._id + ':' + user.password)}`
    );
}]).run(['uibDatepickerPopupConfig', function (uibDatepickerPopupConfig) {
    uibDatepickerPopupConfig.currentText = 'Hoy';
    uibDatepickerPopupConfig.clearText = 'Borrar';
    uibDatepickerPopupConfig.closeText = 'Cerrar';
    uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
}]);
