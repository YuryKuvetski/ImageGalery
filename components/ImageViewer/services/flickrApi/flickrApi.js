(function() {
  'use strict';
  angular.module('FlickrApi', [])
    .factory('flickrApi', function($http, $q, flickrPhotoDecorator) {
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

      function getImages() {
        if (latestLoadedPhotos){
          return $q.resolve(latestLoadedPhotos);
        }

        return $http.get(rawUrl)
        .success( data => {
          var flickrPhotos = response.data.photos.photo;
          latestLoadedPhotos = flickrPhotoDecorator.decorate(flickrPhotos);
          return latestLoadedPhotos;
        }) 
        .error(() => {
          latestLoadedPhotos = [];
          return latestLoadedPhotos;
        });
      }
    });
})();
