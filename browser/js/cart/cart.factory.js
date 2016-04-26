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
        console.log(CartFactory.cart);
        return CartFactory.cart.reduce(function(orig, ele){
            return ele.description.price * ele.quantity + orig;
        }, 0);
    };

    CartFactory.findProd = function(productID){
        return CartFactory.cart.findIndex(function(ele){
            return ele._id === productID;
        });
    };

    CartFactory.export = function(){
        var tempCart = {};
        console.log('in export');
        CartFactory.cart.forEach(function(ele){
            console.log(ele);
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

    CartFactory.populate = function(data){
        if (CartFactory.cart.length === 0) {return; }
        CartFactory.cart = ProductFactory.filterInventory(CartFactory.cart);
        console.log("POPULATED");
        console.log(CartFactory.cart);
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
                console.log($cookies.getObject('genemachine'));
                for (var item in tempCart){
                    CartFactory.cart.push(new CartedProduct(item, tempCart[item]));
                }
            }
        }
    };

    CartFactory.persist = function(user){
        var exportedCart = CartFactory.export();
        if (user) {
            $http.post('/api/users/'+user._id+'/cart', {cart: exportedCart})
            .then(function(updatedUser){
                console.log(updatedUser);
            });
        } else {
            $cookies.putObject('genemachine', exportedCart);
        }
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
            console.log(completedOrder);
            var productsPurchased = "<h3>Your order, "+ completedOrder.data._id+" is processing.  You will receive a confirmation email when it ships.</h3><ul>";
            console.log(productsPurchased);
            productsPurchased =  productsPurchased + completedOrder.data.items.reduce(function(origin, ele){
                return origin + '<li>'+ele.quantity+'x -'+ele.description.name+' - $'+ele.description.price * ele.quantity+'</li>';
            }, '');
            console.log(productsPurchased);
            productsPurchased = productsPurchased+ '</ul><h2>'+productsPurchased + 'Total - $'+completedOrder.data.total + '</h2';
            
            console.log(productsPurchased);
            CartFactory.cart = [];
            CartFactory.persist(user);
            return $http.post('/api/users/email', {email: user.email, text: productsPurchased, subject: 'Your Gene Machine Order is Processing!'}); 
        })
;
    };

    return CartFactory;
});
