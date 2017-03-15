angular.module('myApp')
  .factory('AuthFactory', function($http, $q, $rootScope, $location, StorageFactory, jwtHelper) {

    function login(credentials) {
      const url = '/api/login'
      return $http.post(url, credentials)
        .then( response => response.data.token )
        .then( token => {
          StorageFactory.saveToken(token)
          return token
        })
    }

    function register(credentials) {
      const url = '/api/logregisterin'
      return $http.post(url, credentials)
        .then( $location.path("/login") )
    }

    function logout() {
      delete $rootScope.loggedUser
      StorageFactory.removeToken()
    }

    function isLoggedIn() {
      try {
        var token = StorageFactory.readToken()
        var tokenPayload = jwtHelper.decodeToken( token )
        return !( jwtHelper.isTokenExpired( token ) )
      } catch( e ) {
        return $q.reject('Not Authenticated')
      }
    }

    function setCredentials( token ) {
      var tokenPayload = jwtHelper.decodeToken( token )
      $rootScope.loggedUser = tokenPayload;
    }


    return { login, register, logout, isLoggedIn, setCredentials }

  })
  .factory('StorageFactory', function ($window){

    const store = $window.localStorage;
    const key = 'auth-token';

    function readToken() {
      return store.getItem(key)
    }

    function saveToken(token) {
      return !!store.setItem(key, token)
    }

    function removeToken() {
      return store.removeItem(key)
    }

    return { readToken, saveToken, removeToken }

  })
