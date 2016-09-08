(function() {
  'use strict';
  angular.module('ImageGalleryDirectiveModule', ['ImageGalleryComponentModule'])
    .directive('autoThumbnailSizeCalc', function() {
      return {
        require: '^^imageGallery',
        link: imageGalleryDirectiveLink
      }
    });

  function imageGalleryDirectiveLink(scope, element, attrs, ctrl) {
    var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
    var thumbnailWidth = element.style.clientWidth / 3;

    var thumbnailSize = SIZES.map(function (val, i){
      return {
        value:Math.abs(val - thumbnailWidth),
        index:i
      }; 
    }).sort(function(a, b) {
      return a.value - b.value;
    })[0].index;

    ctrl.setThumbnailSize(thumbnailSize);
  }
})()