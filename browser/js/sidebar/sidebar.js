"use strict";
app.controller('SideBar', function($scope, ProductFactory){
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
		ProductFactory.setFilter($scope.filter);
	};

	$scope.clearFilters = function(){
		console.log($scope);
		$scope.sidebarForm.$setPristine();
		$scope.filter = modelDefault;
		

	};

});