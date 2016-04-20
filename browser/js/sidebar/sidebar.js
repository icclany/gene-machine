"use strict";
app.controller('SideBar', function($scope){
	$scope.filter = {
		categories: {
		small: false,
		medium: false,
		large: false
		},
		tags: '',
		defaultTag: 'Enter Value'
	};
	var modelDefault = angular.copy($scope.filter);
	$scope.filter = function(){
		console.log($scope);
	};

	$scope.clearFilters = function(){
		console.log($scope);
		$scope.sidebarForm.$setPristine();
		$scope.filter = modelDefault;
		

	};

});