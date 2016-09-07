(function () {
  'use strict';
  window.angular.module('FirstTaskApp')
    .component('imageGallery', {
      templateUrl: 'imageGallery.html',
      controller: ImageGalleryCtrl,
      bindings: {
        photos: '='
      }
    });

function ImageGalleryCtrl() {
  var ctrl = this;

  ctrl.showImage = function(imageIndex) {
    alert(imageIndex);
  };

  (function calcThumbnailSize() {
    var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
    var thumbnailWidth = document.body.clientWidth / 3;
    ctrl.thumbnailSize = SIZES.map(function (val, i){
        return {value:Math.abs(val - thumbnailWidth),index:i}; 
      }).sort(function(a, b) {
        return a.value - b.value;
      })[0].index;
  })();
}
})()