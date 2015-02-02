angular.module('iOctoHub', ['angularMoment', 'ionic', 'ionic.utils', 'ngCordova', 'ngCordovaGatekeeper', 'iOctoHub.controllers', 'iOctoHub.timeline'])

.run(['$http', '$ionicPlatform', '$localstorage', '$rootScope', function($http, $ionicPlatform, $localstorage, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.user = $localstorage.getObject('user') || {};

  $rootScope.getUser = function() {
    $http.get('/user').success(function(data) {
      $localstorage.setObject('user', data);
      $rootScope.user = data;
    }).error(function(data) {
      console.log('get user error', JSON.stringify(data))
    });
  }

  if ($localstorage.get('token')) {
    $http.defaults.headers.common['Authorization'] = 'token ' + $localstorage.get('token');
    $rootScope.getUser();
  };

}])


.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push(['$location', '$rootScope', '$q',
    function($location, $rootScope, $q) {
      return {
        request: function(config) {

          // redirect all xhr request to apis
          if (/.html$/.test(config.url) || !/^\//.test(config.url)) {
            //delete config.headers.Authorization
            return config;
          } else {
            var url = CFG.api + config.url;
            config.url = url;
            return config;
          }

        }
      };
  }]);
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/timeline');
});
