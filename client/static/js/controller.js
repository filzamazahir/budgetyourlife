//Dashboard Controller
store_app.controller('DashboardController', function($scope, ProductFactory, OrderFactory, CustomerFactory){
    
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
store_app.controller('ProductsController', function($scope, ProductFactory){
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
store_app.controller('OrdersController', function($scope, OrderFactory, ProductFactory, CustomerFactory){

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

//Customer Controller
store_app.controller('CustomersController', function($scope, CustomerFactory) {

    $scope.getcustomers = function() {
        CustomerFactory.getCustomers(function(data){
            $scope.customers = data;  
        });
    }
    
    $scope.addcustomer = function() {
        $scope.submitted = true;
        if (!$scope.new_customer || !$scope.new_customer.name) {
            return;
        }

        CustomerFactory.findCustomerByName($scope.new_customer.name, function(result){
            if (result) {
                $scope.customer_name_error = "This customer already exists in the database";
            }
            else {
                CustomerFactory.addCustomer($scope.new_customer, function(){
                    $scope.getcustomers();
                    $scope.new_customer = {};
                    $scope.customer_name_error = '';
                    $scope.submitted = false;
                });
            }
        });
        
    }
    $scope.deletecustomer = function(id) {
        CustomerFactory.deleteCustomer(id, $scope.getcustomers);  
    }

    //Functions to run by default
    $scope.submitted = false;
    $scope.customer_name_error = '';
    $scope.getcustomers();

});