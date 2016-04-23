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
            console.log("productFactory.fetchall");
            return productArray.data;
        });
    };

    ProductFactory.addToCart = function(product, user) {
        return $http.post('/api/users/' + user._id + '/cart', {
                item: product
            })
            .then(function(res) {
                if (cart[product._id]) {
                        cart[product._id].quantity++;
                    }
                else {
                    cart[product._id] = {
                        quantity: 1,
                        productinfo: product
                    };
                }
            })
}

ProductFactory.getCart = function(user) {
    // return cart;
    return $http.get('/api/users/' + user._id +'/cart')
    .then(function(userCart) {
        return userCart.data;
    })
}

ProductFactory.updateQuantity = function(user, product, quantity) {
    return $http.put('/api/users/'+ user._id +'/cart', {
        productId: product._id,
        quantity: parseInt(quantity)
    })
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
        return product.data
    });
};

return ProductFactory;
});
