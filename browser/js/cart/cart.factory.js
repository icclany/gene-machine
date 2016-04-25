app.factory('CartFactory', function($http, $cookies, ProductFactory) {
    "use strict";
    var CartFactory = {};
    CartFactory.cart = [];
    var populated = false;
    
    var CartedProduct = function(id, qty){
        this._id = id;
        this.quantity = qty;
    };

    CartFactory.total = function(){
        return CartFactory.cart.reduce(function(ele, orig){
            return ele.description.price + orig.description.price;
        }, 0);
    };

    CartFactory.findProd = function(productID){
        return CartFactory.cart.findIndex(function(ele){
            console.log(ele._id);
            return ele._id === productID;
        });
    };

    CartFactory.export = function(){
        var tempCart = {};
        CartFactory.cart.forEach(function(ele){
            tempCart[ele._id] = ele.qty;
        });
        return tempCart;
    };

    CartFactory.push = function(productID, QTY, user){
        if (CartFactory.cart.length === 0 || CartFactory.findProd(productID) === -1){
            CartFactory.cart.push(new CartedProduct(productID, QTY));
        } else {
            CartFactory.cart[CartFactory.findProd(productID)].qty += QTY;
        }
        CartFactory.persist(user);
        if (populated) {
            $http.get('/api/products/'+productID)
                .then(function(populatedCart){
                    CartFactory.cart[CartFactory.cart.length-1].description = populatedCart.cart.data;
                });
        }
    };


    CartFactory.remove = function(productID, userID){
        CartFactory.cart.splice(CartFactory.findProd(productID), 1);
        CartFactory.persist(userID);
    };

    CartFactory.populate = function(){

        if (CartFactory.cart.length === 0) {return; }
        CartFactory.cart = ProductFactory.filterInventory(CartFactory.cart);
        
    };


    CartFactory.initialize = function(user){
        var tempCart;
        if (user){
            $http.get('/api/users/' + user._id +'/cart')
            .then(function(cart) {
                tempCart = cart.data;
            });
        } else {
            if (Boolean($cookies.getObject('genemachine'))) {
                tempCart = $cookies.getObject('genemachine');
            }
        }
        for (var item in tempCart){
            CartFactory.cart.push(new CartedProduct(item, tempCart[item]));
        }
    };

    CartFactory.persist = function(userID){
        var exportedCart = CartFactory.export();
        if (userID) {
            $http.post('/api/users/'+userID._id+'/cart', {cart: exportedCart});
        } else {
            $cookies.putObject('genemachine', exportedCart);
        }
    };

    CartFactory.finishOrder = function(shipinfo, billinfo, cardinfo, total, user) {
        return $http.put('/api/users/' + user._id +'/checkout', {
                address: shipinfo,
                paymentInfo: {
                    name: cardinfo.name,
                    billingAddress: billinfo,
                    ccNum: cardinfo.number,
                    ccExpiration: cardinfo.date
                }
            })
            .then(function() {
                return $http.delete('/api/users/' + user._id + '/cart');
            });
    };

    CartFactory.submitStripeOrder = function(token){
      $http.put('/api/purchases/', {token: token});
    };

    return CartFactory;
});
