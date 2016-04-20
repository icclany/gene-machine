app.factory('ProductFactory', function($http) {
    var ProductFactory = {};
    var cart = [];
    var inventory;
    var filters = {
      // tags: "*",
      // category: ['small', 'medium', 'large']
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
        console.log("setting filter in Product Factory, which is")
        console.log(filterObj)
        var categories = [];
        for (var size in filterObj.categories) {
            if (filterObj.categories[size]) categories.push(size);
        }
        filters.tags = filterObj.tags;
        filters.category = categories;

        console.log("set filters in factory to")
        console.log(filters)
    }

    ProductFactory.getFilters = function() {
        return filters;
    }

    ProductFactory.fetchById = function(id) {
        return $http.get('/api/products/' + id).then(product => {
            return product.data });
    };

    return ProductFactory;
});
