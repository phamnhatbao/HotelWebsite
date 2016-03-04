angular.module('store').controller("bookingManagerCtrl", ['$rootScope', '$scope','$http','$routeParams', 'bookingFactory', function($rootScope, $scope, $http, $routeParams, bookingFactory){    
	$rootScope.loading = true;
	$scope.data = {};

	bookingFactory.getBookings().then(function(d) {
	    $scope.data = d;
	    $rootScope.loading = false;
	});

	$scope.del = function(bookingID){
		bookingFactory.postRemoveBooking(bookingID).then(function(d) {
			if (d.status = 200) {
				var key = bookingID;
				delete $scope.data[key];
			}
		});
	};

	$scope.payed = function(bookingID){
		var dt = {'pay': true}
		bookingFactory.postPayedBooking(dt, bookingID).then(function(d) {
			if (d.status = 200) {
				$scope.data[bookingID].pay = true;
				$scope.data;
			}
		});
	};
}]);