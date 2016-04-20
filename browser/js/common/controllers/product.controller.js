'use strict';

app.controller('ProductController', function($scope, theProduct) {
    $scope.theProduct = theProduct;
});

app.controller('AllProductsController', function($scope, allProducts, ProductFactory) {
    $scope.products = allProducts;

    // $scope.filter = ProductFactory.getFilters();

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

    // $scope.setFilter = function() {
    //     ProductFactory.setFilter($scope.filter);
    //     console.log("setting filter from sidebar")
    // };

    $scope.clearFilters = function() {
        //      console.log($scope);
        // $scope.sidebarForm.$setPristine();
        $scope.filter.categories = {
            small: false,
            medium: false,
            large: false
        };
        $scope.filter.tags = "";
    };

})

app.filter('ProductFilter', function($filter) {
            return function(list, arrayFilter, element) {
                if (arrayFilter) {
                    return $filter("filter")(list, function(listItem) {
                        console.log("list item is")
                        console.log(listItem)
                        for (var i = 0; i < arrayFilter.length; i++) {
                            console.log("comparing...", arrayFilter[i], listItem[element])
                             // if (arrayFilter[i] == listItem)
                            if (arrayFilter[i] == listItem[element])
                                return false;
                        }
                        return true;
                    });
                }
            }
        }
        )
