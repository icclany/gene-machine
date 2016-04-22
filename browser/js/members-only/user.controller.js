app.controller('UserCtrl', function($scope, SecretStash, currentUser, UserSettingsFact) {
	"use strict";
    $scope.user = currentUser.subjectUser;
    $scope.loggedInUser = currentUser;
    $scope.editSettings = true;
    $scope.newAddress = {};
	$scope.updateProfile = function(){
		UserSettingsFact.updateUser($scope.user)
		.then(function(returnedData){
			$scope.user = returnedData;
			$scope.editSettings = true;
		});
	};
	$scope.updateAddress = function(){
		console.log($scope.newAddress);
		UserSettingsFact.updateAddress($scope.user._id, $scope.newAddress)
		.then(function(returnedData){
			$scope.user = returnedData;
			$scope.editSettings = true;
		});
	};
    //

});
    // SecretStash.getStash().then(function(stash) {
    //     $scope.stash = stash;
    // });
    // //