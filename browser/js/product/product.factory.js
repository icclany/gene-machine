app.factory('ProductFactory', function($http) {
    var ProductFactory = {};
    var cart = {};
    // var inventory;
    var filters = {
      // tags: "*",
      // category: ['small', 'medium', 'large']
    };

    ProductFactory.fetchAll = function() {
        return $http.get('/api/products').then(productArray => {
            // inventory = productArray.data;
            return productArray.data;
        });
    };

    ProductFactory.addToCart = function(product, user) {
        // cart.find(product)
        if(cart[product._id]) {
            // console.log("adding on to old")
            $http.put('/api/users/'+user._id+'/cart', {
                item: product
            })
            .then(function (res) {
                 cart[product._id].quantity++;
                 console.log("Added item to cart")
            })
        }
        else {
            // console.log("adding new")
            cart[product._id] = {
                quantity: 1,
                productinfo: product
            };
        }

    }

    ProductFactory.getCart = function() {
       return cart;
    }
    ProductFactory.emptyCart = function() {
        cart = [];
    }

    ProductFactory.numCart = function() {
        return cart.length;
    }

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
            return product.data});
    };

    return ProductFactory;
});
