app.factory('ProductFactory', function($http) {
    "use strict";
    var ProductFactory = {};
    var cart = {};
    var inventory = [];


    ProductFactory.fetchAll = function() {
        return $http.get('/api/products').then(productArray => {
            inventory = productArray.data;
            return productArray.data;
        });
    };

    ProductFactory.filterInventory = function(cart){
        return cart.map(function(cartProduct){
            var invMatch = inventory.find(function(invProduct) {
                return invProduct._id === cartProduct._id;
            });
            cartProduct.description = invMatch;
            return cartProduct;
        });
    };

ProductFactory.setFilter = function(filterObj) {
    var categories = [];
    for (var size in filterObj.categories) {
        if (filterObj.categories[size]) categories.push(size);
    }
    filters.tags = filterObj.tags;
    filters.category = categories;
}

ProductFactory.getFilters = function() {
    return filters;
}

ProductFactory.fetchById = function(id) {
    return $http.get('/api/products/' + id).then(product => {
        return product.data;
    });
};

return ProductFactory;
});
