angular.module('store').controller("detailsCtrl", ['Flash', '$rootScope', '$scope','$http','$routeParams', 'roomFactory', 'bookingFactory', function(Flash, $rootScope, $scope, $http, $routeParams, roomFactory, bookingFactory){    
	$rootScope.loading = true;
	$scope.data = {};
	$scope.lstRooms = {};
	$scope.senddata = {};

	$scope.dataComment = {};

	roomFactory.getRoomDetail($routeParams.roomID).then(function(d) {
	    $scope.data = d;
	    $rootScope.loading = false;
	});

	roomFactory.getRooms().then(function(d) {
	    $scope.lstRooms = d;

	    $rootScope.loading = false;
	});


	$scope.SendData = function() {
    	//forms user object
    	var receiveData = {};
    	var dt = {
            "id": "",
            "name": "Mr Bill",//$rootScope.globals.currentUser.username,
            "roomID": $scope.data.id,
            "startDate": $scope.senddata.startDate,
            "endDate": $scope.senddata.endDate,
            "numberPerson": $scope.senddata.numberPersons,
            "price": $scope.data.price,
            "pay": "false"
        };

        bookingFactory.postRoomBooking(dt).then(function(d) {
		    receiveData = d;

		    if (receiveData.status == 200) {
				dt = {"id": receiveData.data.name};
				bookingFactory.postRoomBookingReplaceID(dt, receiveData.data.name).then(function(d) {
				    console.log(d);
				});

				var message = 'Booking success';
				Flash.create('success', message);
			}

			$scope.senddata = {};
		});
   	};

   	$scope.postComment = function() {
   		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = mm+'/'+dd+'/'+yyyy;

   		var dt = {
   			"content": $scope.dataComment.textComment,
   			"date": today
   		};

   		roomFactory.postComment($scope.data.id ,dt).then(function(d) {
		    receiveData = d;

		    if (receiveData.status == 200) {
				roomFactory.getCommentsByRoomID($routeParams.roomID).then(function(d) {
				    $scope.data.comments = d;
				    
				    var message = 'Thanks for your comment';
					Flash.create('success', message);
				});
			}

			$scope.dataComment = {};
		});
   	}
}]);