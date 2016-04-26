'use strict';

app.controller('ProductController', function($scope, theProduct, ProductFactory, currentUser, CartFactory) {
    $scope.theProduct = theProduct;

    $scope.addToCart = function() {
        CartFactory.push(theProduct._id, 1, currentUser);
    };

});

app.controller('AllProductsController', function($scope, allProducts) {

    $scope.products = allProducts;
    var categories = [{name: 'small', status: true}, {name: 'medium', status: true}, {name: 'large', status: true}];

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
