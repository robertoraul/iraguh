angular.module('ira.common').directive('enterFocus', [function () {
    return {
        controller: ['$element', function ($element) {
            $element[0].focus();
        }]
    };
}]);
