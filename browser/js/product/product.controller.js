'use strict';

app.controller('ProductController', function($scope, $http, theProduct, ProductFactory, WishListFactory, currentUser, CartFactory) {
    $scope.theProduct = theProduct;
    $scope.user = currentUser;

     $scope.dynamicPopover = {
    
    templateUrl: 'js/product/templates/popoverTemplate.html',
    title: 'Title'
  };
  $scope.user.activeWishlist = null;

  $scope.placement = {
    options: [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
      'left',
      'left-top',
      'left-bottom',
      'right',
      'right-top',
      'right-bottom'
    ],
    selected: 'top'
  };

    $scope.addToCart = function() {
        CartFactory.push(theProduct._id, 1, currentUser);
    };
    $scope.addToWishList = function() {
        WishListFactory.push(theProduct._id, 1, currentUser);
    };

});

app.controller('AllProductsController', function($scope, allProducts) {

    $scope.products = allProducts;

    var tags = allProducts.reduce(function(orig, element) {
        element.tags.forEach(function(tag){
            if (orig.indexOf(tag) === -1) {
                var obj = {};
                obj.status = true;
                obj.name = tag;
                orig.push(obj);
            }
        });
        return orig;
    }, []);

    var categories = allProducts.reduce(function(orig, element) {
        if (element.category && (!orig.find(function(x){
            return x.name === element.category;
        }))) {
            var obj = {};
            obj.status = true;
            obj.name = element.category;
            orig.push(obj);
           return orig;
        } else {
            return orig;
        }
    }, []);

    $scope.typeCategoryClick = function($event){
        this.category.status = !this.category.status;
    };
    $scope.typeButtonClick = function($event){
        this.tag.status = !this.tag.status;
        if (this.tag.status === true) {
            if ($scope.filter.tags.find(function(tag) {return tag.status === false})) {
                $scope.filter.filterByTag = true;
            } else {
                $scope.filter.filterByTag = false;
            }
        } else {
            $scope.filter.filterByTag = true;
        }
    };

    $scope.filter = {
        categories: angular.copy(categories),
        tags: angular.copy(tags),
        description: ''
    };

    $scope.filter.filterByTag = false;
    var modelDefault = angular.copy($scope.filter);

    $scope.clearFilters = function() {
        $scope.filter = angular.copy(modelDefault);
    };

    $scope.filterByCategory = function(category, filterby){
        return function(item){
            if (typeof item[filterby] === 'object'){
                if (!$scope.filter.filterByTag) {
                    return true;
                }
                return category.find(function(x){
                     if (item[filterby].indexOf(x.name) !== -1 && !x.status){
                        return true;
                    }
                });
            } else if (typeof item[filterby] === 'string'){
                if (category.find(function(x){ return x.name === item[filterby] && x.status})) {
                    return true;
                }
            }
        };
    };
});
