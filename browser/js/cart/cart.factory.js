app.factory('CartFactory', function($http) {
    var CartFactory = {};

    CartFactory.getTotal = function(cartObj) {
        let total = 0;
        for (var item in cartObj) {
            total += (cartObj[item].quantity * cartObj[item].productInfo.price);
        }
        return total;
    };

    CartFactory.finishOrder = function(shipinfo, billinfo, cardinfo, user) {
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
