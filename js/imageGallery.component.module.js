(function() {
  'use strict';
  window.angular.module('ImageGalleryComponentModule', [])
    .component('imageGalleryComponent', {
      templateUrl: 'imageGalleryComponent.html',
      controller: imageGalleryComponentCtrl,
      bindings: {
        photos: '='
      }
    });

  function imageGalleryComponentCtrl() {
    var vm = this;
    
    vm.thumbnailSize = function() {
      var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
      var thumbnailWidth = document.body.clientWidth / 3;
      return SIZES.map(function (val, i){
          return {value:Math.abs(val - thumbnailWidth),index:i}; 
        }).sort(function(a, b) {
          return a.value - b.value;
        })[0].index;
    };

    ctrl.showImage = function(imageIndex) {
      alert(imageIndex);
    };
  }
})()