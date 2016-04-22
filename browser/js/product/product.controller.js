'use strict';

app.controller('ProductController', function($scope, theProduct, ProductFactory, currentUser) {
    $scope.theProduct = theProduct;

    $scope.addToCart = function() {
        ProductFactory.addToCart(theProduct, currentUser);
    }

});

app.controller('AllProductsController', function($scope, allProducts, ProductFactory) {
    $scope.products = allProducts;
    $scope.tags = allProducts.reduce(function(orig, element) {
        return orig.concat(element.tags);
    }, []);
    $scope.categories = allProducts.reduce(function(orig, element) {
        // if (orig.find(function(x) {return x!=element.category})) {
        if (orig.indexOf(element.category) === -1) {
           return orig.concat(element.category);
        }
        else return orig;
    }, []);
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
});


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
