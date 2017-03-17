angular.module('myApp')
  .controller('LoginCtrl', function($scope, $location, AuthFactory) {
    $scope.login = function() {
      const email = $scope.email
      const password = $scope.password
      AuthFactory.login({ email, password })
        .then( AuthFactory.setCredentials )
        .then( () => $location.path('/private') )
    }

  })