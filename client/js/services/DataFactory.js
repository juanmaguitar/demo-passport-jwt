angular.module('myApp')
  .factory('DataFactory', function ($http){

    function getPrivateData() {
      const url = '/private'
      return $http.get(url)
        .then( response => response.data )
    }

    return { getPrivateData }

  })