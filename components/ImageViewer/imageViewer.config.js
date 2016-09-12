(function() {
  'use strict';
  angular.module('ImageViewerConfig', ['ui.router', 'ImageGallery', 'ImageView'])
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
})();
