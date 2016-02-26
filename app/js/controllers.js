var hotelControllers = angular.module("hotelControllers", []);

hotelControllers.controller("homeController", ['$scope','$http', function($scope, $http){    
		$http.get('https://hotelbookingwebapp.firebaseio.com/rooms.json').success (function(data){
			$scope.data = data;
		}); 
	}]
);

hotelControllers.controller("detailsController", ['$scope','$http','$routeParams', function($scope, $http, $routeParams){    
			console.log($routeParams);
			$http.get('https://hotelbookingwebapp.firebaseio.com/rooms/' + $routeParams.roomID + '.json').success (function(data){
				$scope.data = data;
				$scope.header = $scope.data.name;
			}); 
		}]
);