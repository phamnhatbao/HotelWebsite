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
	    }
	};
	return myService;
}]);