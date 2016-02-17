//Declare Module
var budgeting_app = angular.module('budgeting_app', ['ngRoute', 'ngMessages', 'angularMoment', 'ng-currency']);

//Declare Routes
budgeting_app.config(function ($routeProvider) {  
  $routeProvider
    .when('/', {
      // console.log('routeProvider - trying to go to /');
      templateUrl: 'partials/home.html',
      controller: 'HomeController',
      access: {restricted: true}
    })
    .when('/index', {
      // console.log('routeProvider - trying to go to /login');
      templateUrl: 'partials/indexpage.html', 
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/logout', {
       // console.log('routeProvider - trying to go to /logout');
      controller: 'logoutController',
      access: {restricted: true}
    })
    // .when('/register', {
    //    // console.log('routeProvider - trying to go to /register');
    //   templateUrl: 'partials/register.html', 
    //   controller: 'registerController',
    //   access: {restricted: false}
    // })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/monthlyexpenses', {
      templateUrl: 'partials/addmonthlyexpense.html',
            controller: 'AddExpensesController',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

//Ensures user is logged in before any page with a restriction is served
budgeting_app.run(function ($rootScope, $location, $route, AuthServiceFactory) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthServiceFactory.isLoggedIn() === false) {
      $location.path('/index');
      $route.reload();
    }
  });
});




