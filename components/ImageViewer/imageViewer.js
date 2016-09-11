(function() {
  'use strict';
  angular.module('ImageViewer', ['FlickrApi', 'ui.router', 'ImageGallery', 'ImageView'])
    .component('imageViewer', {
      templateUrl: 'components/ImageViewer/imageViewer.html',
      controller: imageViewerCtrl,
    })
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state({
          name: 'imageView',
          url: '/imageViewer/imageView',
          template: '<image-view></image-view>'
        })
        .state({
          name: 'imageGallery',
          url: '/imageViewer/imageGallery',
          template: '<image-gallery></image-gallery>'
        });

      $urlRouterProvider.otherwise('/imageViewer/imageGallery');
    });

  function imageViewerCtrl() {
    var vm = this;
  }

})();
