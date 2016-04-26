app.factory('ProductFactory', function($http, Session) {
    var ProductFactory = {};
    var filters = {
        // category: ['small', 'medium', 'large']
    };
    var cart = {};

    ProductFactory.fetchAll = function() {
        return $http.get('/api/products').then(productArray => {
            return productArray.data;
        });
    };

    ProductFactory.getReviews = function() {
        return $http.get('/api/reviews');
    };

    ProductFactory.addToCart = function(product, user) {
        // If user is logged in...
        if (user) {
            return $http.post('/api/users/' + user._id + '/cart', {
                item: product
            });
        } else { // If guest
            if (cart[product._id]) {
                cart[product._id].quantity++;
            } else {
                cart[product._id] = {
                    quantity: 1,
                    productInfo: product
                };
            }
        }
    };

    ProductFactory.getCart = function(user) {
        if (user) {
            return $http.get('/api/users/' + user._id + '/cart')
                .then(function(userCart) {
                    return userCart.data;
                });
        } else {
            return cart;
        }
    };

    ProductFactory.updateQuantity = function(user, product, quantity) {
        if (user) {
            return $http.put('/api/users/' + user._id + '/cart', {
                productId: product._id,
                quantity: quantity
            });
        } else {
            console.log("adding to guest cart")
            cart[product._id] = quantity;
        }
    };

    ProductFactory.removeFromCart = function(user, product) {
        return $http.delete('/api/users/' + user._id + '/cart/' + product._id);
    };

    ProductFactory.emptyCart = function() {
        cart = {};
    };

    ProductFactory.numCart = function() {
        return cart.length;
    };

    ProductFactory.getReviews = function(itemId) {
        return $http.get('/api/products/' + itemId);
    };

    ProductFactory.setFilter = function(filterObj) {
        var categories = [];
        for (var size in filterObj.categories) {
            if (filterObj.categories[size]) categories.push(size);
        }
        filters.tags = filterObj.tags;
        filters.category = categories;
    };

    ProductFactory.getFilters = function() {
        return filters;
    };

    ProductFactory.fetchById = function(id) {
        return $http.get('/api/products/' + id).then(product => {
            return product.data;
        });
    };

    return ProductFactory;
});
