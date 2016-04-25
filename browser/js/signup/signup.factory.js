app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    $http.post('/api/users', userInfo);
  };

  return SignupFactory;
});
