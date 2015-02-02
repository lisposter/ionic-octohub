angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
.factory('$gh', [function() {
  return {
    pageInfo: function(string) {
      if (!string) return;
      var obj = {};
      string.split(',').forEach(function(itm) {
        if (itm.indexOf('rel="next"') > 0) {
          obj.next = /&page=(\d+)/.exec(itm)[1];
        }
      })
      return obj;
    }
  };
}]);
