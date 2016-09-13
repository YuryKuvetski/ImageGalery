(function() {
  'use strict';
  angular.module('FlickrApi', [])
    .factory('flickrApi', function($http, flickrPhotoDecorator) {
      var latestLoadedPhotos;
      var selectedPhotoId;
      var NUMBER_PHOTOS = 6;
      var rawUrl = 'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.getRecent&api_key=5ce64d83cff5e9200bdbb2deff8f1ba9' +
        '&extras=url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o' + 
        '&per_page=' + NUMBER_PHOTOS + '&page=1&format=json&nojsoncallback=1';

       return {
        getImages: getImages,
        getSelectedPhotoId: function () {
          return selectedPhotoId;
        },
        setSelectedPhotoId: function (value) {
          selectedPhotoId = value || 0;
        }
      };

      function getImages(callback) {
        if (latestLoadedPhotos && latestLoadedPhotos != []){
          callback(latestLoadedPhotos);
          return;
        }

        $http({
          method: 'GET',
          url: rawUrl
        }).then(function successCallback(response) {
          var flickrPhotos = response.data.photos.photo;
          latestLoadedPhotos = flickrPhotoDecorator.decorate(flickrPhotos);
          callback(latestLoadedPhotos);
        }, function errorCallback(response) {
          alert("Flickr service request error...");
          latestLoadedPhotos = [];
          callback(latestLoadedPhotos);
        });
      }
    });
})();
