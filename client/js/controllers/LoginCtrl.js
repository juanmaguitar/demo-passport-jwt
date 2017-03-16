angular.module('myApp')
  .controller('LoginCtrl', function($scope, $location, AuthFactory) {
    $scope.login = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.login({ username, password })
        .then( AuthFactory.setCredentials )
        .then( () => $location.path('/private') )
    }

  })