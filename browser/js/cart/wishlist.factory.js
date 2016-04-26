app.factory('WishListFactory', function($http, ProductFactory) {
    "use strict";
    var WishListFactory = {};
    WishListFactory.cart = [];
    var populated = false;

    var CartedProduct = function(id, qty){
        this._id = id;
        this.quantity = qty;
    };

    WishListFactory.getSize = function() {
        return WishListFactory.cart.reduce(function(orig, ele){
            return ele.quantity + orig;
        }, 0);
    };

    WishListFactory.findProd = function(productID){
        return WishListFactory.cart.findIndex(function(ele){
            return ele._id === productID;
        });
    };

    WishListFactory.export = function(){
        var tempCart = {};
        WishListFactory.cart.forEach(function(ele){
            tempCart[ele._id] = ele.quantity;
        });
        return tempCart;
    };

    WishListFactory.push = function(productID, QTY, user, reset){
        if (WishListFactory.cart.length === 0 || WishListFactory.findProd(productID) === -1){
            WishListFactory.cart.push(new CartedProduct(productID, QTY));
        } else if (reset){
            WishListFactory.cart[WishListFactory.findProd(productID)].quantity = QTY;
        } else {
            WishListFactory.cart[WishListFactory.findProd(productID)].quantity += QTY;
        }
        WishListFactory.persist(user);
        if (populated) {
            $http.get('/api/products/'+productID)
                .then(function(populatedCart){
                    WishListFactory.cart[WishListFactory.cart.length-1].description = populatedCart.cart.data;
                });
        }
    };

    WishListFactory.remove = function(productID, userID){
        WishListFactory.cart.splice(WishListFactory.findProd(productID), 1);
        WishListFactory.persist(userID);
    };

    WishListFactory.populate = function(){
        if (WishListFactory.cart.length === 0) {return; }
        WishListFactory.cart = ProductFactory.filterInventory(WishListFactory.cart);
    };

    WishListFactory.initialize = function(user){
        var tempCart;
        if (user){
            $http.get('/api/users/' + user._id +'/cart')
            .then(function(cart) {
                tempCart = cart.data;
                 for (var item in tempCart){
                    WishListFactory.cart.push(new CartedProduct(item, tempCart[item]));
                }
            });
        } else {
            if (Boolean($cookies.getObject('genemachine'))) {
                tempCart = $cookies.getObject('genemachine');
                for (var item in tempCart){
                    WishListFactory.cart.push(new CartedProduct(item, tempCart[item]));
                }
            }
        }
    };

    WishListFactory.persist = function(user){
        var exportedCart = WishListFactory.export();
        if (user) {
            return $http.post('/api/users/'+user._id+'/cart', {cart: exportedCart});
        } else {
            $cookies.putObject('genemachine', exportedCart);
        }
    };

    WishListFactory.saveInfo = function(user, addressInfo, billingInfo) {
         if (user._id) {
            return $http.put('/api/users/'+user._id+'/checkout', {address: addressInfo, paymentInfo: billingInfo});
        };
    };

    WishListFactory.finishOrder = function(shipinfo, billinfo, user) {
        return $http.post('/api/purchases/', {
            items: WishListFactory.cart,
            total: WishListFactory.getTotal(),
            user: user._id,
            email: user.email,
            paymentInfo: billinfo,
            address: shipinfo,
            })
        .then(function(completedOrder) {
            
            var productsPurchased = "%0AYour order, "+ completedOrder.data._id+" is processing.  You will receive a confirmation email when it ships.%0D";
            productsPurchased =  '%0A'+productsPurchased + completedOrder.data.items.reduce(function(origin, ele){
                return origin + '%0A'+ele.quantity+'x -'+ele.description.name+' - $'+ele.description.price * ele.quantity+'%0D';
            }, '');
            productsPurchased = productsPurchased+ '%0A'+productsPurchased + 'Total - $'+completedOrder.data.total + '%0D';
            WishListFactory.cart = [];
            WishListFactory.persist(user);
            return $http.post('/api/users/email', {email: user.email, text: productsPurchased, subject: 'Your Gene Machine Order is Processing!'}); })
        .then(function() {
            WishListFactory.cart = [];
            WishListFactory.persist(user);
            WishListFactory.saveInfo(user, shipinfo, billinfo);
        });
    };

    return WishListFactory;
});
