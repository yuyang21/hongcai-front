'use strict';
angular.module('exceptionOverwrite', [])
  .factory('$exceptionHandler', function() {
    return function(exception, cause)
    {
      fundebug.notifyError(exception);
    };
  });