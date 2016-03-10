angular.module('store').controller("listCtrl", ['$rootScope', '$scope','$http','$routeParams', 'roomFactory', function($rootScope, $scope, $http, $routeParams, roomFactory){    
	$rootScope.loading = true;
	$scope.data = {};
	console.log($routeParams);

	var stringFilter = "";
	if ($routeParams.keyword != "-") {
		stringFilter += 'orderBy="name"&startAt="' + $routeParams.keyword + '"';
	}

	// if($routeParams.view != "-" && $routeParams.keyword == '-'){
	// 	stringFilter += 'orderBy="view"&equalTo="' + $routeParams.view + '"';
	// }
	// else if ($routeParams.view != "-" && $routeParams.keyword != '-') {
	// 	stringFilter += '&orderBy="view"&equalTo="' + $routeParams.view + '"';
	// }


	// if($routeParams.keyword != "-" || $routeParams.view != "-"){
	// 	stringFilter += '&orderBy="price"&startAt=' + parseInt($routeParams.price.split(';')[0]) + '&endAt='+ parseInt($routeParams.price.split(';')[1]);
	// }
	// else{
	// 	stringFilter += 'orderBy="price"&startAt=' + parseInt($routeParams.price.split(';')[0]) + '&endAt='+ parseInt($routeParams.price.split(';')[1]);
	// }

	console.log(stringFilter);

	roomFactory.getFilter(stringFilter).then(function(d) {
	    $scope.data = d;
	    console.log($scope.data);
	    $rootScope.loading = false;
	});
}]);