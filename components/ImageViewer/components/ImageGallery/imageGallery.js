(function() {
  'use strict';
  angular.module('ImageGallery', ['FlickrApi'])
    .component('imageGallery', {
      templateUrl: 'components/ImageViewer/components/ImageGallery/imageGallery.html',
      controller: imageGalleryCtrl
    });

  function imageGalleryCtrl(flickrApi) {
    var vm = this;

    vm.flickrApi = flickrApi;
    vm.$postLink = calcThumbnailSize;
    vm.showImage = showImage;
    
    flickrApi.getImages().then(function(data) {
      vm.photos = data;  
    });

    function calcThumbnailSize() {
      var SIZES = [75, 100, 150, 240, 320, 640, 800, 1024];
      var thumbnailWidth = document.body.clientWidth / 3;
      
      vm.thumbnailSize = SIZES.map(function (val, i){
        return {
          value:Math.abs(val - thumbnailWidth),
          index:i
        }; 
      }).sort(function(a, b) {
        return a.value - b.value;
      })[0].index;
    };

    function showImage(imageIndex) {
      alert(imageIndex);
    };
  }
})();