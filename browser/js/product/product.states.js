'use strict';

app.config(function($stateProvider){
  $stateProvider.state('product', {
    url: '/product/:productId',
    templateUrl: '/js/product/templates/singleproductpage.html',
    controller: 'ProductController',
    resolve: {
      theProduct: function(ProductFactory, $stateParams){
        return ProductFactory.fetchById($stateParams.productId);
      }
    }
  });
});

app.config(function($stateProvider){
  $stateProvider.state('allProducts', {
    url: '/products',
    templateUrl: '/js/product/templates/allProducts.html',
    controller: 'AllProductsController',
    resolve: {
      allProducts: function(ProductFactory){
        return ProductFactory.fetchAll();
      }
    }
  });
});
