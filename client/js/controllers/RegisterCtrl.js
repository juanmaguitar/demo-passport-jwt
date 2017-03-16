angular.module('myApp')
  .controller('RegisterCtrl', function($scope, AuthFactory) {
    $scope.register = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.register({ username, password })
    }
  })