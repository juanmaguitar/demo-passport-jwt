angular.module('myApp')
  .factory('DataFactory', function ($http){

    function getPrivateData() {
      const url = '/private'
      return $http.get(url)
        .then( response => response.data )
    }

    return { getPrivateData }

  })
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
      const url = '/api/register'
      return $http.post(url, credentials)
        .then( $location.path("/login") )
    }

    function logout() {
      delete $rootScope.loggedUser
      StorageFactory.removeToken()
    }

    function isLoggedIn() {
      try {
        const token = StorageFactory.readToken()
        if (!token) return false
        const tokenPayload = jwtHelper.decodeToken( token )
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
