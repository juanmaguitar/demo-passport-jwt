angular.module('myApp')
  .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout()
      $location.path('/private');
    }
  })