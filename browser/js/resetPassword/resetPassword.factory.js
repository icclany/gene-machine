app.factory('ResetPasswordFact', function($http) {
    "use strict";
        
    var submitReset = function(token, password) {
        return $http.put('/api/users/reset/'+token, {password: password})
            .then(function(updatedUser){
                return updatedUser.data;
            });
        };

    return {
        submitReset: submitReset
    };
});
