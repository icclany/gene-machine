"use strict";
app.controller('SideBar', function($scope, ProductFactory) {
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

    $scope.setFilter = function() {
        ProductFactory.setFilter($scope.filter);
        console.log("setting filter from sidebar")
    };

    $scope.clearFilters = function() {
        //      console.log($scope);
        // $scope.sidebarForm.$setPristine();
        $scope.filter.categories = {
            small: false,
            medium: false,
            large: false
        };
        $scope.filter.tags = "";
        console.log("clearing filters")
        console.log($scope.filter)
        ProductFactory.setFilter($scope.filter);
    };

});
