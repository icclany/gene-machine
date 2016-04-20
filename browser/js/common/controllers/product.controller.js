'use strict';

app.controller('ProductController', function($scope, theProduct){
  $scope.theProduct = theProduct;
});

app.controller('AllProductsController', function($scope, allProducts, ProductFactory){
  $scope.products = allProducts;

    $scope.filter = ProductFactory.getFilters();

});
