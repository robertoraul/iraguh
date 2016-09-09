angular.module('ira.users', ['ira.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('users', {
            abstract: true,
            url: '/users',
            template: '<ui-view/>'
        })
        .state('users.index', {
            url: '',
            template: '<users/>'
        })
        .state('users.new', {
            url: '/new',
            template: '<users-editor/>'
        })
        .state('users.editor', {
            url: '/:id',
            template: '<users-editor user="$resolve.user"/>',
            resolve: {
                user: ['$stateParams', 'usersService', ($stateParams, usersService) => usersService.find($stateParams.id)]
            }
        });
}]);
