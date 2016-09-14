(function() {
  'use strict';
  angular.module('ImageViewerConfig', ['ui.router', 'ImageGallery', 'ImageView'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('imageViewer',{
          controller: imageViewerCtrl,
          url: '/imageViewer',
          template: '<ui-view></ui-view>'
        })
        .state('imageViewer.imageView', {
          template: '<image-view></image-view>',
          url: '/imageView'
        })
        .state('imageViewer.imageGallery',{
          template: '<image-gallery></image-gallery>',
          url: '/imageGallery'
        });

      $urlRouterProvider.otherwise('/imageViewer');

      function imageViewerCtrl($state) {
        $state.transitionTo('imageViewer.imageGallery');
      }
    });
})();
