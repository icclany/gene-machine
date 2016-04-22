app.config(function($stateProvider){
  "use strict";
  $stateProvider.state('UserSettings', {
    url: '/usersettings/',
    templateUrl: '/js/usersettings/UserSettings.html',
    controller: 'UserSettings',
    params: {
      user: null
      },
  	resolve: {
      User: function($stateParams, $http){
      	return $stateParams.user;
      	// $http.get('/api/users/'+user._id)
      	// .then(function(populatedUser){
      	// 	console.log('http response from user');
      	// 	console.log(populatedUser);
      	// }); 
  		}
  	}
  });
});