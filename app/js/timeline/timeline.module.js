angular.module('iOctoHub.timeline', [])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.timeline', {
        url: "/timeline",
        views: {
          'menuContent': {
            templateUrl: "templates/timeline.html",
            controller: 'TimelineCtrl'
          }
        }
      });


  });
