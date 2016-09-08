(function() {
  'use strict';
  angular.module('MainServiceModule', [])
    .service('flickr', function($http) {
      this.getImages = function(callback) {
        var NUMBER_PHOTOS = 6;
        var rawUrl = 'https://api.flickr.com/services/rest/' +
          '?method=flickr.photos.getRecent&api_key=5ce64d83cff5e9200bdbb2deff8f1ba9' +
          '&extras=url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o' + 
          '&per_page=' + NUMBER_PHOTOS + '&page=1&format=json&nojsoncallback=1';

        $http({
				  method: 'GET',
				  url: rawUrl
				}).then(function successCallback(response) {
				    var flickrPhotos = response.data.photos.photo;
				    callback(decorateFlickrPhotos(flickrPhotos) || []);
				  }, function errorCallback(response) {
				    alert("Flickr service request error...");
          	callback([]);
			  	});

        function decorateFlickrPhotos(flickrPhotos) {
          var photo;
          var photos = [];
          for(var i = 0; i < flickrPhotos.length; i++) {
              var flickrPhoto = flickrPhotos[i];
              var photoUrls = getPhotoUrls(flickrPhoto);
              photo = {
                title: flickrPhoto['title'],
                urls: photoUrls
              };
              photos.push(photo);
          }
          return photos;

          function getPhotoUrls(flickrPhoto) {
            var FLICKR_SIZE_POSTFIX = ['sq', 't', 'q', 's', 'n', 'z', 'c', 'l', 'o'];
            var lastPhotoUrl = findFirstFlickrUrl(flickrPhoto);
            var photoUrl;
            var result = [];
            
            for (var i = 0; i < FLICKR_SIZE_POSTFIX.length; i++){
              photoUrl = getPhotoUrlByPostfix(flickrPhoto, FLICKR_SIZE_POSTFIX[i]);
              lastPhotoUrl = photoUrl ? photoUrl : lastPhotoUrl;
              result.push(lastPhotoUrl);
            }
            return result;

            function findFirstFlickrUrl(flickrPhoto) {
              var photoUrl;
              for (var i = 0; i < FLICKR_SIZE_POSTFIX.length && !photoUrl; i++){
                photoUrl = getPhotoUrlByPostfix(flickrPhoto, FLICKR_SIZE_POSTFIX[i]);
              }
              return photoUrl;
            }

            function getPhotoUrlByPostfix(flickrPhoto, postfix) {
              if (flickrPhoto['url_' + postfix]){
                return {
                  url: flickrPhoto['url_' + postfix],
                  width: flickrPhoto['width_' + postfix] || 0,
                  height: flickrPhoto['height_' + postfix] || 0
                };
              }
            }
          }
        }
      };
    });
})();
