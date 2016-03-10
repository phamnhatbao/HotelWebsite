(function(){
	var app = angular.module('store',['ngAnimate', 'ngRoute', 'ngCookies', 'flash'])

	app.controller('HelloWorldController', ['$scope', function($scope) {
		$scope.greeting = 'Hello World!';
	}]);

	app.directive('roomsDirective', [function () {
		return {
			restrict: 'EA',
			templateUrl: './template/directive/item.html',
			scope: {
    			data: "="
    		}
		};
	}]);

	app.directive('roomCompare', [function () {
		return {
			restrict: 'A',
			templateUrl: '../template/directive/room-compare.html'
		};
	}]);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: './template/pages/home.html',
				controller: 'homeCtrl'
			})
			.when('/details/:roomID', {
				templateUrl: './template/pages/details.html',
				controller: 'detailsCtrl'
			})
			.when('/bookingmanager', {
				templateUrl: './template/pages/bookingmanager.html',
				controller: 'bookingManagerCtrl'
			})
			.when('/list/:keyword/:view/:price', {
				templateUrl: './template/pages/list.html',
				controller: 'listCtrl'
			})
			.when('/login', {
				templateUrl: './template/pages/login.html',
				controller: 'loginCtrl'
			})
			.otherwise({
				redirectTo: '/home'
			});

		// use the HTML5 History API
        // $locationProvider.html5Mode(true);
	}]);

	app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
		$rootScope.loading = true;
		$rootScope.logged = false;

        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line

            $rootScope.logged = true;
        }
        else{
        	$rootScope.logged = false;
        }
 
        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     // redirect to login page if not logged in and trying to access a restricted page
        //     var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        //     var loggedIn = $rootScope.globals.currentUser;
        //     if (restrictedPage && !loggedIn) {
        //         $location.path('/login');
        //     }
        // });
	}]);
})();
