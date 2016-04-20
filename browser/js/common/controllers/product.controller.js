'use strict';

app.controller('ProductController', function($scope, theProduct) {
    $scope.theProduct = theProduct;
});

app.controller('AllProductsController', function($scope, allProducts, ProductFactory) {
    $scope.products = allProducts;

    $scope.filter = ProductFactory.getFilters();
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
                                return true;
                        }
                        return false;
                    });
                }
            }
        }
        )
