
app.controller('UserCtrl', function($scope, $state, User, UserSettingsFact, PurchaseHistory) {
	"use strict";
    $scope.user = User.subjectUser;
    $scope.loggedInUser = User.currentUser;
    $scope.newBilling = {};
    $scope.newAddress = {};
    $scope.newBillingAddress = {};
    $scope.billingTransfer;
    $scope.addressTransfer;
    $scope.password;

    console.log("purchase history is");
    console.log(PurchaseHistory)
    $scope.purchases = PurchaseHistory;

	$scope.submitEdits = function(){
		if ($state.current.name === 'membersOnly.address') {
			$scope.user.address.push($scope.newAddress);

		} else if ($state.current.name === 'membersOnly.billing') {
			$scope.newBillingAddress.name = $scope.newBilling.name;
			$scope.newBilling.billingAddress = $scope.newBillingAddress;
			$scope.user.paymentInfo.push($scope.newBilling);
		}

	   var user = JSON.parse(angular.toJson($scope.user));
		UserSettingsFact.updateUser(user)
		.then(function(returnedData){
			$scope.user = returnedData;
		});
	};

	$scope.editOnFileBilling = function(){
		var billingIDX = $scope.user.paymentInfo.findIndex(function(x){
			return x._id === $scope.billingSelected;
		});
		$scope.billingTransfer = $scope.user.paymentInfo[billingIDX];

		$state.go('membersOnly.editBilling');
	};
	$scope.editOnFileAddress = function(){
		var billingIDX = $scope.user.address.findIndex(function(x){
			return x._id === $scope.addressSelected;
		});
		$scope.addressTransfer = $scope.user.address[billingIDX];

		$state.go('membersOnly.editAddress');
	};

	$scope.updatePassword = function () {
		if(password.passwordA !== password.passwordB){
        	$scope.incongruentPasswords = true;
        } else {
			$scope.user.password = password.passwordA;
			console.log($scope.user.password);
			var user = JSON.parse(angular.toJson($scope.user));
	        UserSettingsFact.updateUser(user)
			.then(function(returnedData){
				$scope.user = returnedData;
			});
        }
    };

});
