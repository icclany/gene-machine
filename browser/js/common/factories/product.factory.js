app.factory('ProductFactory', function($http) {
  var ProductFactory = {};
  var cart = [];
  var inventory;
  var filters = {

  };

  ProductFactory.fetchAll = function() {
    return $http.get('/api/products').then(productArray => {
      inventory = productArray.data;
      return productArray.data;
    });
  };

  ProductFactory.numCart = function() {
    return cart.length;
  }

  ProductFactory.setFilter = function(filterObj) {
    filters = filterObj;
  }

  ProductFactory.getFilter = function() {
    return filters;
  }

  ProductFactory.fetchById = function(id){
    return $http.get('/api/products/' + id).then(product => {return product.data});
  };

  return ProductFactory;
});
