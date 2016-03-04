(function(){
	var app = angular.module('store',['ngAnimate', 'ngRoute']).run(function($rootScope) {
	    $rootScope.loading = true;
	});

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
			.otherwise({
				redirectTo: '/home'
			});

		// use the HTML5 History API
        // $locationProvider.html5Mode(true);
	}]);
})();
