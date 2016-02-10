//Product Factory
budgeting_app.factory('ProductFactory', function($http){
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
budgeting_app.factory('OrderFactory', function($http){
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



//User Factory
budgeting_app.factory('UserFactory', function($http) {
    var factory = {};
    var users = [];

    //returned the entire list here
    factory.getUsers = function(callback) {
        $http.get('/users').success(function(output){
            users = output;
            callback(users);
        }); 
    }

    factory.findUserByUsername = function(username, callback) {
        $http.get('/users/findonebyname/'+username).success(function(output){
            callback(output);
        }); 
    }

    factory.addUser = function(newdata, callback) {
        $http.post('/users/new', newdata).success(function(output){
            console.log('user being added here')
            callback();
        });
    }

    factory.deleteUser = function(id, callback) {
        $http.delete('/users/remove/'+id).success(function(output){
            callback();
        });
    }

    // factory.getRecentCustomers = function (callback) {
    //     $http.get('/customers/recent').success(function(output){
    //         callback(output);
    //     })
    // }

    return factory;
});



