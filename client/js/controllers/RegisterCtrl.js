angular.module('myApp')
  .controller('RegisterCtrl', function($scope, AuthFactory) {
    $scope.register = function() {
      const email = $scope.email
      const password = $scope.password
      AuthFactory.register({ email, password })
    }
  })