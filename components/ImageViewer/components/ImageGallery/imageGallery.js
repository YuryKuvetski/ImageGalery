(function() {
  'use strict';
  angular.module('ImageGallery', ['FlickrApi', 'ThumbnailSize'])
    .component('imageGallery', {
      templateUrl: 'components/ImageViewer/components/ImageGallery/imageGallery.html',
      controller: imageGalleryCtrl
    });

  function imageGalleryCtrl(flickrApi) {
    var vm = this;

    vm.selectPhoto = selectPhoto;
    vm.$onInit = onInit;
    vm.onThumbnailSizeCalculated = onThumbnailSizeCalculated;

    function onInit() {
      flickrApi.getImages().then(data => { 
        vm.photos = data; 
      });
    }

    function selectPhoto(id) {
      flickrApi.setSelectedPhotoId(id);
    }

    function onThumbnailSizeCalculated(value) {
      vm.thumbnailSize = value;
    }
  }
})();
