(function() {
  'use strict';
  angular.module('MainComponentModule', ['MainServiceModule', 
  	'ImageGalleryComponentModule', 'ImageGalleryDirectiveModule'])
    .component('main', {
      templateUrl: 'imageGalleryComponent.html',
      controller: mainComponentCntrl,
    });

  function mainComponentCntrl(flickr) {
    var vm = this;

    flickr.getImages(function(data) {
    	vm.photos = data;
    });
  }

})()
