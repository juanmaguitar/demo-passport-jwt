angular.module('myApp')
  .factory('AuthFactory', function($http) {
    function login(credentials) {
      $http.post('/api/login', credentials)
        .then( response => response.data.token )
        .then( token => localStorage.setItem('token', token) )

    }
    return { login }
  })
