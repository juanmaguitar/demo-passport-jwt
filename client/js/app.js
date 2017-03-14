angular.module('myApp',['ngRoute'])
  .config( function($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl: '/partials/home.html'
      })
      .when('/login',{
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
      })
  })