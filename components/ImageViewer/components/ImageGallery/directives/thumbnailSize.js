(function() {
  'use strict';
  angular.module('ThumbnailSize', [])
    .directive('thumbnailSize', thumbnailSizeDirective);

    function thumbnailSizeDirective() {
      return {
        restrict: 'E',
        scope: {
          'setThumbnailSize': '&callback'
        },
        link: imageGalleryDirectiveLink
      }

      function imageGalleryDirectiveLink(scope, element, attrs) {
          var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
          var thumbnailWidth = element[0].offsetParent.offsetWidth / 3;

          var thumbnailSize = SIZES.map(function (val, i){
            return {
              value:Math.abs(val - thumbnailWidth),
              index:i
            }; 
          }).sort(function(a, b) {
            return a.value - b.value;
          })[0].index;

          scope.setThumbnailSize(thumbnailSize);
      }
    }  
})();