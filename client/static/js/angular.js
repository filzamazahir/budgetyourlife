//Declare Module
var store_app = angular.module('store_app', ['ngRoute', 'ngMessages', 'angularMoment']);

//Declare Routes
store_app.config(function ($routeProvider) {  
  $routeProvider
    .when('/', {
        templateUrl: 'partials/dashboard.html'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html'
    })
    .when('/products', {
      templateUrl: 'partials/products.html'
    })
    .when('/orders', {
        templateUrl: 'partials/orders.html'
    })
    .when('/customers', {
      templateUrl: 'partials/customers.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});