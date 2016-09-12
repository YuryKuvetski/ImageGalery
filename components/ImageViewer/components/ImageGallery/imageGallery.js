(function() {
  'use strict';
  angular.module('ImageGallery', ['FlickrApi'])
    .directive('imageGallery', imageGalleryDirective);

    function imageGalleryDirective(flickrApi) {
      return {
        templateUrl: 'components/ImageViewer/components/ImageGallery/imageGallery.html',
        link: imageGalleryDirectiveLink
      }

      function imageGalleryDirectiveLink(scope, element, attrs) {
        scope.flickrApi = flickrApi;
        scope.thumbnailSize = calcThumbnailSize();
        
        flickrApi.getImages(function(data) {
          scope.photos = data;  
        });

        function calcThumbnailSize() {
          var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
          var thumbnailWidth = element[0].offsetParent.offsetWidth / 3;

          return SIZES.map(function (val, i){
            return {
              value:Math.abs(val - thumbnailWidth),
              index:i
            }; 
          }).sort(function(a, b) {
            return a.value - b.value;
          })[0].index;
        };
      }
    }  
})();