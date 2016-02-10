budgeting_app.factory('AuthServiceFactory', function ($q, $timeout, $http) {
  var factory = {};
  // create user variable
  var user = null;

  factory.isLoggedIn = function() {
    if(user) {
      return true;
    } else {
      return false;
    }
  }


  factory.getUserStatus = function() {
    return user;
  }

  factory.login = function(loginForm) {
    console.log('AuthServiceFactory - factory.login');

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/users/login',loginForm)
    .success(function (data, status) {  // handle success
      if(status === 200 && data.status){
        console.log('authfactory.login - user was logged in successfully', data);
        user = true;
        deferred.resolve();
      } else {
        console.log('authfactory.login - user was not logged in');
        user = false;
        deferred.reject();
      }
    })
    .error(function (data) {  // handle error
      console.log('authfactory.login - handle error');
      user = false;
      deferred.reject();
    });

    // return promise object
    console.log('authfactory.login - deferred onject', deferred);
    return deferred.promise;
  }

  factory.logout = function() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/users/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
      console.log('authfactory.logout - logout successful');
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
      console.log('authfactory.logout - logout errors');
    });

    // return promise object
    return deferred.promise;

  }

  factory.register = function(new_user) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    console.log('password: ', new_user.password);
    $http.post('/users/register', {
      firstname: new_user.firstName, 
      lastname: new_user.firstName,
      email: new_user.email, 
      username: new_user.username, 
      password: new_user.password })
    .success(function (data, status) {  // handle success
    if(status === 200 && data.status){
      console.log('authfactory.register - user was registered successfully', data);
      deferred.resolve();
    } else {
      deferred.reject();
    }
    })
    .error(function (data) {  // handle error
    deferred.reject();
    });

    // return promise object
    return deferred.promise;

  }
  // return available functions for use in controllers
  return factory
});

