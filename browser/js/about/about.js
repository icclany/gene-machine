'use strict';

app.config(function($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'js/about/about.html',
        resolve: {
            allProducts: function(ProductFactory) {
                return ProductFactory.fetchAll();
            }
        }
    });

});
