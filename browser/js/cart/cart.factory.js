app.factory('CartFactory', function($http, $cookies, ProductFactory) {
    "use strict";
    var CartFactory = {};
    CartFactory.cart = [];
    var populated = false;

    var CartedProduct = function(id, qty){
        this._id = id;
        this.quantity = qty;
    };

    CartFactory.getTotal = function(){
        return CartFactory.cart.reduce(function(orig, ele){
            return ele.description.price * ele.quantity + orig;
        }, 0);
    };

    CartFactory.getSize = function() {
        return CartFactory.cart.reduce(function(orig, ele){
            return ele.quantity + orig;
        }, 0);
    };

    CartFactory.findProd = function(productID){
        return CartFactory.cart.findIndex(function(ele){
            return ele._id === productID;
        });
    };

    CartFactory.export = function(){
        var tempCart = {};
        CartFactory.cart.forEach(function(ele){
            tempCart[ele._id] = ele.quantity;
        });
        return tempCart;
    };

    CartFactory.push = function(productID, QTY, user, reset){
        if (CartFactory.cart.length === 0 || CartFactory.findProd(productID) === -1){
            CartFactory.cart.push(new CartedProduct(productID, QTY));
        } else if (reset){
            CartFactory.cart[CartFactory.findProd(productID)].quantity = QTY;
        } else {
            CartFactory.cart[CartFactory.findProd(productID)].quantity += QTY;
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
                 for (var item in tempCart){
                    CartFactory.cart.push(new CartedProduct(item, tempCart[item]));
                }
            });
        } else {
            if (Boolean($cookies.getObject('genemachine'))) {
                tempCart = $cookies.getObject('genemachine');
                for (var item in tempCart){
                    CartFactory.cart.push(new CartedProduct(item, tempCart[item]));
                }
            }
        }
    };

    CartFactory.persist = function(user){
        var exportedCart = CartFactory.export();
        if (user) {
            return $http.post('/api/users/'+user+'/cart', {cart: exportedCart});
        } else {
            $cookies.putObject('genemachine', exportedCart);
        }
    };

    CartFactory.saveInfo = function(user, addressInfo, billingInfo) {
         if (user._id) {
            return $http.put('/api/users/'+user._id+'/checkout', {address: addressInfo, paymentInfo: billingInfo});
        };
    };

    CartFactory.finishOrder = function(shipinfo, billinfo, user) {
        return $http.post('/api/purchases/', {
            items: CartFactory.cart,
            total: CartFactory.getTotal(),
            user: user._id,
            email: user.email,
            paymentInfo: billinfo,
            address: shipinfo,
            })
        .then(function(completedOrder) {

            var productsPurchased = "Your order, "+ completedOrder.data._id+" is processing.  You will receive a confirmation email when it ships.";
            productsPurchased =  ''+productsPurchased + completedOrder.data.items.reduce(function(origin, ele){
                return origin + ''+ele.quantity+'x -'+ele.description.name+' - $'+ele.description.price * ele.quantity+'';
            }, '');
            productsPurchased = productsPurchased+ ''+productsPurchased + 'Total - $'+completedOrder.data.total + '';
            return $http.post('/api/users/email', {email: user.email, text: productsPurchased, subject: 'Your Gene Machine Order is Processing!'}); })
        .then(function() {
            CartFactory.cart = [];
            CartFactory.persist(user._id);
        });
    };

    return CartFactory;
});
