angular.module('store').controller("detailsCtrl", ['$rootScope', '$scope','$http','$routeParams', 'roomFactory', 'bookingFactory', function($rootScope, $scope, $http, $routeParams, roomFactory, bookingFactory){    
	$rootScope.loading = true;
	$scope.data = {};
	$scope.senddata = {};

	roomFactory.getRoomDetail($routeParams.roomID).then(function(d) {
	    $scope.data = d;
	    console.log($scope.data);
	    $rootScope.loading = false;
	});

	$scope.SendData = function() {
    	//forms user object
    	var receiveData = {};
    	var dt = {
            "id": "",
            "name": "Mr Test",
            "roomID": $scope.data.id,
            "startDate": $scope.senddata.startDate,
            "endDate": $scope.senddata.endDate,
            "numberPerson": $scope.senddata.numberPersons,
            "price": $scope.data.price,
            "pay": "false"
        };

        console.log(dt);

        bookingFactory.postRoomBooking(dt).then(function(d) {
		    receiveData = d;
		    console.log(d);

		    if (receiveData.status == 200) {
				dt = {"id": receiveData.data.name};
				bookingFactory.postRoomBookingReplaceID(dt, receiveData.data.name).then(function(d) {
				    console.log(d);
				});
			}
		});

		
   	};
}]);