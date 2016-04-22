'use strict';

app.controller('ProductController', function($scope, theProduct, ProductFactory, currentUser) {
    $scope.theProduct = theProduct;

    $scope.addToCart = function() {
        return ProductFactory.addToCart(theProduct, currentUser);
    }

});

app.controller('AllProductsController', function($scope, allProducts, ProductFactory) {

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

    $scope.typeCategoryClick = function($event, scope){
        this.category.status = !this.category.status;
    };
    $scope.typeButtonClick = function($event, scope){
        this.tag.status = !this.tag.status;
        if (this.tag.status === true) {
            if ($scope.filter.tags.find(function(tag) {return tag.status === false})) {
                $scope.filter.filterByTag = true;
            } else {
                console.log($scope);
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
