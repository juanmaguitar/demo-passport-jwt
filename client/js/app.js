angular.module('myApp',['ngRoute','angular-jwt'])
  .config( function($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl: '/partials/home.html',
      })
      .when('/login',{
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register',{
        templateUrl: '/partials/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/private',{
        templateUrl: '/partials/private.html',
        controller: 'PrivateCtrl',
        resolve : {
          'auth' : AuthFactory =>  AuthFactory.isLoggedIn()
        }
      })
  })
  .run(function($rootScope, $location, StorageFactory, AuthFactory){

      if ( AuthFactory.isLoggedIn() ) {
        const token = StorageFactory.readToken()
        AuthFactory.setCredentials(token)
      }

      $rootScope.$on('$routeChangeError', function(next, current, previous, rejection){
          if(rejection === 'Not Authenticated'){
              $location.path('/login');
          }
      })
  })