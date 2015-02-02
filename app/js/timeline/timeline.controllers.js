angular.module('iOctoHub.timeline')
.controller('TimelineCtrl', ['$gh', '$http', '$rootScope', '$scope', function($gh, $http, $rootScope, $scope) {
  $scope.page = {};

  function load(pageNum) {
    if (!pageNum) pageNum = 1;
    return $http.get('/users/' + $rootScope.user.login + '/received_events?per_page=10&page=' + pageNum)
  }

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });

  $scope.loadMore = function(page) {
    load($scope.page.next)
    .success(function(data, status, headers) {
      if ($scope.events) {
        $scope.events = $scope.events.concat(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      } else {
        $scope.events = data;
      }
      $scope.page = $gh.pageInfo(headers('Link'));
    })
    .finally(function() {
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });;
  };

  $scope.doRefresh = function() {
    load(1)
    .success(function(data) {
      $scope.events = data;
    })
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });;
  };

}]);
