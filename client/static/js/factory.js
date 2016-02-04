//Product Factory
store_app.factory('ProductFactory', function($http){
    var factory = {};
    var products = [];

    factory.getProducts = function(callback) {
        $http.get('/products').success(function(output){
            products = output;
            callback(products);
        }); 
    }

    factory.addProduct = function (newdata, callback) {
        $http.post('/products/new', newdata).success(function(output){
            callback();
        });
    }

    factory.getRecentProducts = function (callback) {
        $http.get('/products/recent').success(function(output){
            callback(output);
        })
    }

    factory.getOneProduct = function(id, callback) {
        $http.get('/products/findbyid/'+id).success(function(output){
            callback(output);
        })
    }

    return factory;
});

//Order Factory
store_app.factory('OrderFactory', function($http){
    var factory = {};

    factory.getOrders = function(callback) {
        $http.get('/orders').success(function(output){
            orders = output;
            callback(orders);
        }); 
    }

    factory.addOrder = function(customer, product, qty, callback){
        var newdata = {customer: customer, product: product, qty: qty};
        $http.post('/orders/new', newdata).success(function(output){
            callback();
        });
    }

    factory.getRecentOrders = function (callback) {
        $http.get('/orders/recent').success(function(output){
            callback(output);
        });
    }


    return factory;

});



//Customer Factory
store_app.factory('CustomerFactory', function($http) {
    var factory = {};
    var customers = [];

    //returned the entire list here
    factory.getCustomers = function(callback) {
        $http.get('/customers').success(function(output){
            customers = output;
            callback(customers);
        }); 
    }

    factory.findCustomerByName = function(name, callback) {
        $http.get('/customers/findonebyname/'+name).success(function(output){
            callback(output);
        }); 
    }

    factory.addCustomer = function(newdata, callback) {
        $http.post('/customers/new', newdata).success(function(output){
            callback();
        });
    }

    factory.deleteCustomer = function(id, callback) {
        $http.delete('/customers/remove/'+id).success(function(output){
            callback();
        });
    }

    factory.getRecentCustomers = function (callback) {
        $http.get('/customers/recent').success(function(output){
            callback(output);
        })
    }

    return factory;
});



