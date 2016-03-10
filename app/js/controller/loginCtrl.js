(function () {
    'use strict';
 
    angular
        .module('store')
        .controller('loginCtrl', LoginController);
 
    LoginController.$inject = ['$location', 'AuthenticationService', 'Flash', '$rootScope', '$scope'];
    function LoginController($location, AuthenticationService, Flash, $rootScope, $scope) {
        $rootScope.loading = true;
        var self = this;
        
        $scope.user = {};
        $scope.login = login;
 
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        function login() {
            self.dataLoading = true;
            AuthenticationService.Login($scope.user.username, $scope.user.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
                    $rootScope.logged = true;
                    $location.path('/');
                } else {
                    var message = response.message;
                    Flash.create('warning', message);
                    self.dataLoading = false;
                }
            });
        };
        $rootScope.loading = false;
    }
 
})();