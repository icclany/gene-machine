app.factory('ProductFactory', function($http) {
  var ProductFactory = {};

  ProductFactory.fetchAll = function() {
    return $http.get('/api/products').then(productArray => {
      return productArray.data;
    });
  };

  ProductFactory.fetchById = function(id){
    return $http.get('/api/products/' + id).then(product => {return product.data});
  };

  return ProductFactory;
});
