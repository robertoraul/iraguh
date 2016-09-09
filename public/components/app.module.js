angular.module('ira.core', [
    // Angular modules
    // 3rs-party modules
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'lodash',
    // Cross-app modules
    'blocks.confirmModal',
    'blocks.httpInterceptor',
    'blocks.infoModal',
    'ira.common'
]);
angular.module('ira', [
    'ira.core',
    'ira.home',
    'ira.fira',
    'ira.logs',
    'ira.users'
]);
