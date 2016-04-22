app.controller('UserSettings', function($scope, User, UserSettingsFact){
	"use strict"
	$scope.user = User;
	$scope.editSettings = true;
	$scope.updateProfile = function(){
		UserSettingsFact.updateUser($scope.user)
		.then(function(returnedData){
			$scope.user = returnedData;
			$scope.editSettings = true;
		});
		
	};

	
});