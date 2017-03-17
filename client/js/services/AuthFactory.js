angular.module('myApp')
  .factory('AuthFactory', function($http, $q, $rootScope, $location, StorageFactory, jwtHelper) {

    function login(credentials) {
      const url = '/auth/login'
      return $http.post(url, credentials)
        .then( response => response.data.token )
        .then( token => {
          StorageFactory.saveToken(token)
          return token
        })
    }

    function register(credentials) {
      const url = '/auth/register'
      return $http.post(url, credentials)
        .then( $location.path("/login") )
    }

    function logout() {
      delete $rootScope.loggedUser
      StorageFactory.removeToken()
    }

    function isLoggedIn() {
        const token = StorageFactory.readToken()
        if (!token) return false
        const tokenPayload = jwtHelper.decodeToken( token )
        return !( jwtHelper.isTokenExpired( token ) )
    }

    function setCredentials( token ) {
      var tokenPayload = jwtHelper.decodeToken( token )
      $rootScope.loggedUser = tokenPayload;
    }

    return { login, register, logout, isLoggedIn, setCredentials }

  })