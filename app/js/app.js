(function(){
	var app = angular.module('store',[]);

	app.controller('appController', ['$scope', 'appService', 'appFactory', function($scope, service, appFactory){
		
		appFactory.async().then(function(){
			$scope.data = appFactory.data();
		});

		$scope.user = {};
		
	}]);

	app.service('appService', ['$http', function ($http) {
		
	}]);

	app.directive('footerDirective', [function () {
		return {
			restrict: 'E',
			templateUrl: '../template/footer.html'
		};
	}]);

	app.directive('roomsDirective', [function () {
		return {
			restrict: 'EA',
			templateUrl: '../template/item.html',
			scope: {
    			data: "="
    		}
		};
	}]);

	app.directive('roomCompare', [function () {
		return {
			restrict: 'A',
			templateUrl: '../template/room-compare.html'
		};
	}])

	app.directive('headerDirective', [function () {
		return {
			restrict: 'A',
			templateUrl: '../template/header.html'
		};
	}])

	app.factory('appFactory', ['$http', '$q', function($http, $q) {
		var deffered = $q.defer();
		var data = [];
		var appFactory = {};

		appFactory.async = function(){
			$http.get('https://hotelbookingwebapp.firebaseio.com/rooms.json').success(function(response){
				data = response;
				deffered.resolve();
			});
			return deffered.promise;
		};
		appFactory.data = function(){return data;};
		return appFactory;
	}]);
})();
