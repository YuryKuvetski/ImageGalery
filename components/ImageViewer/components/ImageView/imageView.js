(function() {
  'use strict';
  var module = angular.module('ImageView', ['ngAnimate']);
  module.component('imageView', {
      templateUrl: 'components/ImageViewer/components/ImageView/imageView.html',
      controller: imageViewCtrl
    });

  imageViewCtrl.$inject = ['$window', 'flickrApi'];

  function imageViewCtrl($window, flickrApi) {
    var vm = this;
    vm.openOriginalImage = openOriginalImage;
    vm.nextPhoto = nextPhoto;
    vm.prevPhoto = prevPhoto;

    flickrApi.getImages().then(function(data) {
      vm.photos = data;
      vm.id = flickrApi.getSelectedPhotoId() || 0; 
    });

    function openOriginalImage(photo) {
      var urls = photo.urls;
      $window.open(urls[urls.length - 1].url, '_blank');
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