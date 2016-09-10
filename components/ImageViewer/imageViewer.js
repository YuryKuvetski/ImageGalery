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
          url: '/imageViewer/{id:int}',
          template: '<image-view></image-view>',
          resolve: {
            photoId: function($stateParams, flickrApi) {
              flickrApi.setSelectedPhotoId($stateParams.id);
            }
          }
        })
        .state({
          name: 'imageGallery',
          url: '/imageViewer',
          template: '<image-gallery></image-gallery>'
        });

      $urlRouterProvider.when('', '/imageViewer');
    });

  function imageViewerCtrl() {
    var vm = this;
  }

})();
