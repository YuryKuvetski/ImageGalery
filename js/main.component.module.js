(function() {
  'use strict';
  window.angular.module('MainComponentModule', ['MainServiceModule', 'ImageGalleryComponentModule'])
    .component('mainComponent', {
      templateUrl: 'imageGalleryComponent.html',
      controller: mainComponentCntrl,
    });

  function mainComponentCntrl(flickr) {
    var vm = this;
    vm.photos = flickr.getImages();
  }

})()
