angular.module('myApp')
  .controller('PrivateCtrl', function($scope, $location, DataFactory) {
    DataFactory.getPrivateData()
      .then( ({ message }) => $scope.message = message )
  })
