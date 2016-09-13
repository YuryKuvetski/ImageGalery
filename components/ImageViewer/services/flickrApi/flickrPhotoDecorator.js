(function() {
  'use strict';
  angular.module('FlickrApi')
    .factory('flickrPhotoDecorator', function() {
      var FLICKR_SIZE_POSTFIX = ['sq', 't', 'q', 's', 'n', 'z', 'c', 'l', 'o'];

      return {
        decorate: function (flickrPhotos) {
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
        }
      };

      function getPhotoUrls(flickrPhoto) {
        var lastPhotoUrl = findFirstFlickrUrl(flickrPhoto);
        var photoUrl;
        var result = [];
        
        for (var i = 0; i < FLICKR_SIZE_POSTFIX.length; i++){
          photoUrl = getPhotoUrlByPostfix(flickrPhoto, FLICKR_SIZE_POSTFIX[i]);
          lastPhotoUrl = photoUrl ? photoUrl : lastPhotoUrl;
          result.push(lastPhotoUrl);
        }
        return result;
      }

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
    });
})();
