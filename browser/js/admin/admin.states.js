app.config(function($stateProvider){
  $stateProvider.state('adminUsers', {
    url: '/admin/users',
    templateUrl: '/js/admin/templates/adminUsers.html',
    controller: 'AdminUserCtrl',
    resolve: {
      theUsers: function(AdminFactory){
        return AdminFactory.fetchAllUsers().then(function(users){
          return users;
        });
      }
    }
  });
});

app.config(function($stateProvider){
  $stateProvider.state('adminProducts', {
    url: '/admin/products',
    templateUrl: '/js/admin/templates/adminProducts.html',
    controller: 'AdminProductCtrl',
    resolve: {
      theProducts: function(ProductFactory){
        return ProductFactory.fetchAll().then(function(products){
          return products;
        });
      }
    }
  });
});

app.config(function($stateProvider){
  $stateProvider.state('productSettings', {
    url: '/admin/product/edit',
    templateUrl: '/js/admin/templates/adminSingleProduct.html',
    controller: 'AdminSingleProductCtrl',
    params: {
      product: null
    },
    resolve: {
      theProduct: function(ProductFactory, $stateParams){
        return ProductFactory.fetchById($stateParams.product._id).then(function(product){
          return product;
        });
      },
    }
  });
});
