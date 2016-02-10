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

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  $http.post('/user/login',loginForm)
    // handle success
    .success(function (data, status) {
      if(status === 200 && data.status){
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

factory.logout = function() {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a get request to the server
  $http.get('/user/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

  // return promise object
  return deferred.promise;

}

factory.register = function(new_user) {

  // create a new instance of deferred
  var deferred = $q.defer();

  // send a post request to the server
  console.log('password: ', new_user.password);
  $http.post('/user/register', {
      firstname: new_user.firstName, 
      lastname: new_user.firstName,
      email: new_user.email, 
      username: new_user.username, 
      password: new_user.password })
    .success(function (data, status) {  // handle success
      if(status === 200 && data.status){
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

