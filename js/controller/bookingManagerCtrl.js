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

				var message = '<strong> Well done!</strong>  You successfully delete a booking ticket.';
				Flash.create('success', message);
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

		var message = '<strong> Well done!</strong>  You successfully change a status booking ticket.';
		Flash.create('success', message);
	};
}]);