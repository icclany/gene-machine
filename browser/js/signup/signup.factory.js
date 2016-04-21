app.factory('SignupFactory', function($http){
  var SignupFactory = {};

  SignupFactory.createNewUser = function(userInfo){
    console.log('in the SignupFactory');
    console.log('userInfo: ', userInfo);
    $http.post('/api/users', userInfo);
  };

  return SignupFactory;
});
