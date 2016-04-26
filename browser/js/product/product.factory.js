app.factory('ProductFactory', function($http) {
    var ProductFactory = {};
    var cart = {};
    var inventory;

    ProductFactory.fetchAll = function() {
        return $http.get('/api/products').then(productArray => {
            inventory = productArray.data;
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

    ProductFactory.filterInventory = function(cart){
        return cart.map(function(cartProduct){
            var invMatch = inventory.find(function(invProduct) {
                return invProduct._id === cartProduct._id;
            });
            cartProduct.description = invMatch;
            return cartProduct;
        });
    };

    ProductFactory.fetchById = function(id) {
        return $http.get('/api/products/' + id).then(product => {
            return product.data;
        });
    };

    return ProductFactory;
});
