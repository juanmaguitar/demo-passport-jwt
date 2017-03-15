angular.module('myApp')
  .factory('AuthFactory', function($http, $q, $location, StorageFactory, jwtHelper) {

    function login(credentials) {
      const url = '/api/login'
      $http.post(url, credentials)
        .then( response => response.data.token )
        .then( token => StorageFactory.saveToken(token) )
    }

    function register(credentials) {
      const url = '/api/logregisterin'
      $http.post(url, credentials)
        .then( $location.path("/login") )
    }

    function logout() {
      console.log('removing token...')
      StorageFactory.removeToken();
    }

    function isLoggedIn() {
      try {
        var token = StorageFactory.readToken();
        var tokenPayload = jwtHelper.decodeToken( token );
        return !( jwtHelper.isTokenExpired( token ) )
      } catch( e ) {
        return $q.reject('Not Authenticated');
      }
    }


    return { login, register, logout, isLoggedIn }

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
