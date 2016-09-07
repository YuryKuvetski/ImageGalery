(function (angular) {
  'use strict';
  angular.module('FirstTaskApp')
    .component('imageGallery', {
      templateUrl: 'imageGallery.html',
      /*template:
        '<div ng-hide="$ctrl.photos">' +
          'Photos not loaded... ' +
        '</div>' +
        '<div ng-show="$ctrl.photos">' +
          'ThumbnailSize = {{$ctrl.thumbnailSize}}' +

          '<div class="image-gallery__row">' +
            '<a ng-repeat="photo in $ctrl.photos | limitTo:3:0" ng-href="#{{$index}}" class="image-gallery__item">' +
              '<img  ng-src="{{photo.urls[$ctrl.thumbnailSize].url}}" alt="{{photo.title}}"> ' +
            '</a>' +
          '</div>' +
          '<div class="image-gallery__row">' +
            '<a ng-repeat="photo in $ctrl.photos | limitTo:3:2" ng-href="#{{$index}}" class="image-gallery__item">' +
              '<img  ng-src="{{photo.urls[$ctrl.thumbnailSize].url}}" alt="{{photo.title}}"> ' +
            '</a>' +
          '</div>' +
        '</div>',*/
      controller: ImageGalleryCtrl,
      bindings: {
        photos: '='
      }
    });
})(window.angular)

function ImageGalleryCtrl() {
  var ctrl = this;
  ctrl.thumbnailSize = 1;
}