angular.module('store').factory('bookingFactory', ['$http', '$q', function($http, $q) {
	var myService = {
	    getBookings: function() {
			// $http returns a promise, which has a then function, which also returns a promise
	      	var promise = $http.get('https://hotelbookingwebapp.firebaseio.com/booking.json').then(function (response) {
		        // The then function here is an opportunity to modify the response
		        console.log(response.data);
		        // The return value gets picked up by the then in the controller.
		        return response.data;
	      	});
			// Return the promise to the controller
			return promise; 
	    },

	    postRemoveBooking: function(bookingID){
	    	var config = {
                headers : {
                    'X-HTTP-Method-Override': 'DELETE'
                }
            };

            //var promise = $http.post('https://hotelbookingwebapp.firebaseio.com/booking.json?orderBy=%22id%22&equalTo=%22' + bookingID + '%22')
	        var promise = $http.delete('https://hotelbookingwebapp.firebaseio.com/booking/' + bookingID + '.json')
	        .success(function (data, status, headers, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        })
	        .error(function (data, status, header, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        });
	      	return promise;
	    },

	    postRoomBooking: function(postData){
	    	var promise = $http.post('https://hotelbookingwebapp.firebaseio.com/booking.json', postData)
	        .success(function (data, status, headers, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        })
	        .error(function (data, status, header, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        });
	      	return promise;
	    },

	    postRoomBookingReplaceID: function(postData, postID){
	    	var promise = $http.post('https://hotelbookingwebapp.firebaseio.com/booking/' + postID + '.json?x-http-method-override=PATCH', postData)
	        .success(function (data, status, headers, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        })
	        .error(function (data, status, header, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        });
	      	return promise;
	    },

	    postPaidBooking: function(postData, postID){
	    	var promise = $http.post('https://hotelbookingwebapp.firebaseio.com/booking/' + postID + '.json?x-http-method-override=PATCH', postData)
	        .success(function (data, status, headers, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        })
	        .error(function (data, status, header, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        });
	      	return promise;
	    }
  	};
  	return myService;
}]);