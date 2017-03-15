angular.module('myApp')
  .controller('LoginCtrl', function($scope, $location, AuthFactory) {
    $scope.login = function() {
      const username = $scope.username
      const password = $scope.password
      AuthFactory.login({ username, password })
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
  .controller('PrivateCtrl', function(auth) {
    console.log(auth)
    console.log('private messages...')
  })
