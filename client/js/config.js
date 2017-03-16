angular.module('myApp')
  .config( function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  })
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
        secure: true
      })
  })