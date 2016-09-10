(function() {
  'use strict';
  angular.module('ImageView', ['FlickrApi'])
    .component('imageView', {
      templateUrl: 'components/ImageViewer/components/ImageView/imageView.html',
      controller: imageViewCtrl
    });

  function imageViewCtrl(flickrApi) {
    var vm = this;

    flickrApi.getImages().then(function(data) {
      vm.photos = data;
      vm.id = flickrApi.getSelectedPhotoId();
      vm.photo = data[vm.id]; 
    });
    
  }
})();