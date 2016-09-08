(function() {
  'use strict';
  angular.module('MainComponentModule', ['MainServiceModule', 'ImageGalleryComponentModule'])
    .component('mainApp', {
      templateUrl: 'mainComponent.html',
      controller: mainComponentCntrl,
    });

  function mainComponentCntrl(flickr) {
    var vm = this;

    flickr.getImages(function(data) {
    	vm.photos = data;
    });
  }

})()
