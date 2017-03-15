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
  .run(function($rootScope, $location){
      $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
          if(rejection === 'Not Authenticated'){
              $location.path('/login');
          }
      })
  })