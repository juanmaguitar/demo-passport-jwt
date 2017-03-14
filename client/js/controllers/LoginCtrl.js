angular.module('myApp')
  .controller('LoginCtrl', function($scope, AuthFactory) {
    $scope.login = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.login({ username, password })
    }

  })
