angular.module('iOctoHub.controllers', [])

.controller('AppCtrl', ['$cordovaGatekeeper', '$http', '$ionicModal', '$localstorage', '$rootScope', '$scope', '$state', '$timeout', function($cordovaGatekeeper, $http, $ionicModal, $localstorage, $rootScope, $scope, $state, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $cordovaGatekeeper.auth(CFG.client_id, CFG.scope, CFG.gatekeeper).then(function(result) {
      $localstorage.set('token', result.token);
      $http.defaults.headers.common['Authorization'] = 'token ' + result.token;

      $rootScope.getUser();
      $state.go('app.timeline');
    }, function(error) {
      console.log(error);
    })
  };

  $scope.logout = function() {
    $localstorage.set('token', '');
    $http.defaults.headers.common['Authorization'] = '';
    $rootScope.user = {};
    $localstorage.setObject('user', {});
  };
}])

.controller('LandingCtrl', ['$cordovaGatekeeper', '$http', '$ionicModal', '$localstorage', '$rootScope', '$scope', '$state', '$timeout', function($cordovaGatekeeper, $http, $ionicModal, $localstorage, $rootScope, $scope, $state, $timeout) {

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $cordovaGatekeeper.auth(CFG.client_id, CFG.scope, CFG.gatekeeper).then(function(result) {
      $localstorage.set('token', result.token);
      $http.defaults.headers.common['Authorization'] = 'token ' + result.token;

      $rootScope.getUser();
      $state.go('app.timeline');
    }, function(error) {
      console.log(error);
    })
  };


}]);
