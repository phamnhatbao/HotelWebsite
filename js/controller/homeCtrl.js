angular.module('store').controller("homeCtrl", ['$rootScope', '$scope', '$location', 'roomFactory', function($rootScope, $scope, $location, roomFactory){
	$rootScope.loading = true;
	$scope.searchData = {};
	roomFactory.getRooms().then(function(d) {
	    $scope.data = d;

	    $rootScope.loading = false;
	});

	$scope.search = function(){
		if ($scope.searchData.keyword == undefined) {
			$scope.searchData.keyword = '-';
		}
		if ($scope.searchData.view == undefined) {
			$scope.searchData.view = '-';
		}
		if($scope.searchData.price == undefined)
		{
			$scope.searchData.price = "1000;4000";
		}

		$location.path('/list/'+ $scope.searchData.keyword + '/' + $scope.searchData.view + '/' + $scope.searchData.price);
	};
}]);