angular.module('store').controller("bookingManagerCtrl", ['Flash', '$rootScope', '$scope','$http','$routeParams', 'bookingFactory', function(Flash, $rootScope, $scope, $http, $routeParams, bookingFactory){    
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

	$scope.paid = function(bookingID){
		var dt = {'pay': true}
		bookingFactory.postPaidBooking(dt, bookingID).then(function(d) {
			if (d.status = 200) {
				$scope.data[bookingID].pay = true;
				$scope.data;
			}
		});

		var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
		Flash.create('success', message);
	};
}]);