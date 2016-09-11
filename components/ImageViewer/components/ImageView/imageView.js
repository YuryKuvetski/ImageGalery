(function() {
  'use strict';
  angular.module('ImageView', ['FlickrApi', 'ngAnimate'])
    .component('imageView', {
      templateUrl: 'components/ImageViewer/components/ImageView/imageView.html',
      controller: ['$window', 'flickrApi',imageViewCtrl]
    });

  function imageViewCtrl($window, flickrApi) {
    var vm = this;
    vm.openOriginalImage = openOriginalImage;
    vm.nextPhoto = nextPhoto;
    vm.prevPhoto = prevPhoto;

    flickrApi.getImages().then(function(data) {
      vm.photos = data;
      vm.id = flickrApi.getSelectedPhotoId() || 0; 
    });

    function openOriginalImage() {
      $window.open(vm.photos[vm.id].urls[vm.photos[vm.id].urls.length - 1].url, '_blank');
    }

    function nextPhoto() {
      vm.id = (vm.id + 1) % vm.photos.length;
    }

    function prevPhoto() {
      vm.id -= 1;
      if (vm.id - 1 < 0){
        vm.id = vm.photos.length - 1;
      }
    }
  }
})();