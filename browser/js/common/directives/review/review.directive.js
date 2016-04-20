'use strict';

app.directive('review', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/product/review.html',
    scope: {
      theReview: '='
    }
  };
});
