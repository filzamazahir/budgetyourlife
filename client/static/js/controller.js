//Dashboard Controller
budgeting_app.controller('DashboardController', function($scope, ProductFactory, OrderFactory, CustomerFactory){
    
    $scope.getrecentproducts = function(){
        ProductFactory.getRecentProducts(function(data){
            $scope.recentproducts = data;
        });
    }

    $scope.getrecentorders = function() {
        OrderFactory.getRecentOrders(function(data){
            $scope.recentorders = data;
        });
    }

    $scope.getrecentcustomers = function () {
        CustomerFactory.getRecentCustomers(function(data){
            $scope.recentcustomers = data;
        });
    }
    $scope.getrecentproducts();
    $scope.getrecentorders();
    $scope.getrecentcustomers();
});

//Products Controller
budgeting_app.controller('ProductsController', function($scope, ProductFactory){
    $scope.getproducts = function() {
        ProductFactory.getProducts(function(data){
            $scope.products = data;  
        });
    }
    $scope.addproduct = function (){
        $scope.submitted = true;
        if (!$scope.new_product || !$scope.new_product.name || !$scope.new_product.image_url || !$scope.new_product.quantity) {
            return;
        }

        ProductFactory.addProduct($scope.new_product, function(){
            $scope.getproducts();
            $scope.new_product = {}
            $scope.submitted = false;
        });
         
    }

    //Functions to run by default
    $scope.submitted = false;
    $scope.getproducts();


});


//Orders Controller
budgeting_app.controller('OrdersController', function($scope, OrderFactory, ProductFactory, CustomerFactory){

    $scope.getorders = function() {
        OrderFactory.getOrders(function(data){
            $scope.orders = data;  
        });
    }

    $scope.getproducts = function() {
        ProductFactory.getProducts(function(data){
            $scope.products = data;  
        });
    }

    $scope.getcustomers = function() {
        CustomerFactory.getCustomers(function(data){
            $scope.customers = data;  
        });
    }

    $scope.addorder = function() {
        $scope.submitted = true;
        if (!$scope.selectedCustomer || !$scope.selectedProduct || !$scope.selectedQty) {
            return;
        }

        ProductFactory.getOneProduct($scope.selectedProduct._id, function(result){
            if (result.quantity < $scope.selectedQty) {
                $scope.ordererror = "Our apologies. We do not have enough items in stock!";
            }

            else {
                OrderFactory.addOrder($scope.selectedCustomer, $scope.selectedProduct, $scope.selectedQty, function(){
                    $scope.getorders();
                    $scope.selectedCustomer = {};
                    $scope.selectedProduct = {};
                    $scope.selectedQty = {};
                    $scope.ordererror = '';
                    $scope.submitted = false;
                });
            }

        });     
        
    }

    //Function for simple for loop to be used for quantity
        $scope.range = function (min, max, step) {
            step = step || 1;
            var arr = [];
            for (var i=min; i<= max; i+=step) { // max is inclusive here
                arr.push(i);
            }
            return arr;
        }

    //Functions to run by default
    $scope.ordererror = '';
    $scope.submitted = false;
    $scope.getorders();
    $scope.getproducts();
    $scope.getcustomers();
});

//Users Controller
budgeting_app.controller('UsersController', function($scope, UserFactory) {

    $scope.getusers = function() {
        UserFactory.getCustomers(function(data){
            $scope.customers = data;  
        });
    }
    
    $scope.adduser = function() {
        $scope.submitted = true;
        if (!$scope.new_user || !$scope.new_user.name) {
            return;
        }

        UserFactory.findUserByUserame($scope.new_user.username, function(result){
            if (result) {
                $scope.user_name_error = "This customer already exists in the database";
                console.log('username already exists')
            }
            else {
                UserFactory.addUser($scope.new_user, function(){
                    $scope.getcustomers();
                    $scope.new_user = {};
                    $scope.user_name_error = '';
                    $scope.submitted = false;
                });
            }
        });
        
    }
    // $scope.deletecustomer = function(id) {
    //     UserFactory.deleteCustomer(id, $scope.getcustomers);  
    // }

    //Functions to run by default
    $scope.submitted = false;
    $scope.customer_name_error = '';
    // $scope.getcustomers();

});


budgeting_app.controller('loginController', function ($scope, $location, AuthServiceFactory) {
    $scope.login_form = true;
    $scope.logout_button = false;

    console.log(AuthServiceFactory.getUserStatus());

    $scope.login = function () {
        console.log('LoginController - scope.login');
        // initial values
        $scope.error = false;
        $scope.disabled = true;
        // call login from service
        AuthServiceFactory.login($scope.loginForm)
        .then(function () {  // handle success
            console.log('Login Controller - login status: ', AuthServiceFactory.getUserStatus());
            $scope.login_form = false;
            $scope.logout_button = true;
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
        })
        .catch(function () {  // handle error
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
        });

    };

    $scope.logout = function () {
        console.log('Login Controller. logout', AuthServiceFactory.getUserStatus());
        // call logout from service
        AuthServiceFactory.logout()
            .then(function () {
                $location.path('/index');
                $scope.login_form = true;
                $scope.logout_button = false;
                console.log('Login Controller. logout successful');
        
        });
    };



});

// budgeting_app.controller('logoutController', function ($scope, $location, AuthServiceFactory) {

//     $scope.logout = function () {
//         console.log(AuthServiceFactory.getUserStatus());
//         // call logout from service
//         AuthServiceFactory.logout()
//             .then(function () {
//               $location.path('/login');
//         });
//     };

// });

budgeting_app.controller('registerController', function ($scope, $location, AuthServiceFactory) {

    console.log(AuthServiceFactory.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthServiceFactory.register($scope.new_user)
        .then(function () { // handle success
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {  // handle error
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

});






