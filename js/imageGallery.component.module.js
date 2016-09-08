(function() {
  'use strict';
  angular.module('ImageGalleryComponentModule', [])
    .component('imageGallery', {
      templateUrl: 'imageGalleryComponent.html',
      controller: imageGalleryComponentCtrl,
      bindings: {
        photos: '='
      }
    });

  function imageGalleryComponentCtrl() {
    var vm = this;
    vm.showImage = showImage;
    vm.setThumbnailSize = setThumbnailSize;

    function showImage(imageIndex) {
      alert(imageIndex);
    };

    function setThumbnailSize(value) {
      vm.thumbnailSize = value;
    }
  }
})()