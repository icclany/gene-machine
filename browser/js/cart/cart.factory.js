app.factory('CartFactory', function($http) {
    var CartFactory = {};

    CartFactory.getTotal = function(cartObj) {
        let total = 0;
        for (var item in cartObj) {
            total += (cartObj[item].quantity * cartObj[item].productInfo.price);
        }
        return total;
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
      console.log('submitStripeOrder');
      if(token.user){
        $http.delete('/api/users/' + token.user._id + '/cart');
      }
      return $http.put('/api/purchases/', {token: token});
    };

    return CartFactory;
});
