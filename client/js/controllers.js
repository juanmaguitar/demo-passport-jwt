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
  .controller('RegisterCtrl', function($scope, AuthFactory) {
    $scope.register = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.register({ username, password })
    }
  })
  .controller('NavbarCtrl', function($scope, $location, AuthFactory) {

    $scope.logout = function() {
      AuthFactory.logout()
      $location.path('/private');
    }
  })
  .controller('PrivateCtrl', function($scope, $location, auth, DataFactory) {
    if(!auth) $location.path('/login');
    DataFactory.getPrivateData()
      .then( ({ message }) => $scope.message = message )
  })
