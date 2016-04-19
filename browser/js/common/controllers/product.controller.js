'use strict';

app.controller('ProductController', function($scope, theProduct){
  $scope.product = theProduct;
});

app.controller('AllProductsController', function($scope, allProducts){
  $scope.products = allProducts;
});
