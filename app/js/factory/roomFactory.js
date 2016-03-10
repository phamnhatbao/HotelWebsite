angular.module('store').factory('roomFactory', ['$http', '$q', function($http, $q) {
	var myService = {
	    getRooms: function() {
			// $http returns a promise, which has a then function, which also returns a promise
	      	var promise = $http.get('https://hotelbookingwebapp.firebaseio.com/rooms.json').then(function (response) {
		        // The then function here is an opportunity to modify the response
		        console.log(response);
		        // The return value gets picked up by the then in the controller.
		        return response.data;
	      	});
			// Return the promise to the controller
			return promise;
	    },

	    getRoomDetail: function(roomID){
	      	var promise = $http.get('https://hotelbookingwebapp.firebaseio.com/rooms/' + roomID + '.json').then(function (response) {
		        console.log(response);
		        return response.data;
	      	});
	      	return promise;
	    },

	    getFilter: function(stringFilter){
	    	var promise = $http.get('https://hotelbookingwebapp.firebaseio.com/rooms/.json?' + stringFilter).then(function (response) {
		        console.log(response);
		        return response.data;
	      	});
	      	return promise;
	    },

	    postComment: function(roomID, postData) {
			var promise = $http.post('https://hotelbookingwebapp.firebaseio.com/rooms/' + roomID + '/comments.json', postData)
	        .success(function (data, status, headers, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        })
	        .error(function (data, status, header, config) {
	            console.log("{'data': '" + data + "', 'status': '" + status + "', 'headers': '" + header + "', 'config': '" + config + "'}");
	        });
	      	return promise;
	    },

	    getCommentsByRoomID: function(roomID) {
			// $http returns a promise, which has a then function, which also returns a promise
	      	var promise = $http.get('https://hotelbookingwebapp.firebaseio.com/rooms/' + roomID + '/comments.json').then(function (response) {
		        // The then function here is an opportunity to modify the response
		        console.log(response);
		        // The return value gets picked up by the then in the controller.
		        return response.data;
	      	});
			// Return the promise to the controller
			return promise;
	    },
	};
	return myService;
}]);