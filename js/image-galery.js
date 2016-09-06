function ImageGalery(options) {
  var elem,
      columns = options.columns || 3,
      rows = options.rows || 2,
      width = options.width || 720,
      flickrThumbnailSizeLetter,
      flickrOriginalSizeLetter,
      SMAL_IMAGE_SIZE = 100,
      SMAL_IMAGE_FLICKR_LETTER = 't',
      MEDIUM_IMAGE_SIZE = 240,
      MEDIUM_IMAGE_FLICKR_LETTER = 'm',
      LARGE_IMAGE_SIZE = 640,
      LARGE_IMAGE_FLICKR_LETTER = 'z',
      VERYLARGE_IMAGE_SIZE = 800,
      VERYLARGE_IMAGE_FLICKR_LETTER = 'c';

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    elem = document.createElement('div');
    elem.className = "image-galery";

    elem.onmousedown = function() {
      return false;
    };

    elem.onclick = function(event) {
      if (event.target.closest('.image-galery__item')) {
        show();
      }
    }

    renderItems();
  }

  function renderItems() {
    var items = getImages(),
        itemIndex = 0;

    for (var i = 0; i < rows; i++) {
      var row = document.createElement('div');
      row.className = 'image-galery__row';
      for (var j = 0; j < columns; j++) {
        var image = document.createElement('img');
        image.className = 'image-galery__item';
        image.src = items[itemIndex].thumbnail;
        image.style.flex = items[itemIndex].thumbnailWidth;
        row.appendChild(image);
        itemIndex++;
      }
      elem.appendChild(row);
    }
  }

  function getImages() {
    flickrThumbnailSizeLetter = calcFlickrImageSize(width / columns);
    flickrOriginalSizeLetter = calcFlickrImageSize(width);
    var extras = 'url_' + flickrThumbnailSizeLetter + ', url_' + flickrOriginalSizeLetter;
    var perPage = rows * columns;
    var page = 1;
    var rawUrl = 'https://api.flickr.com/services/rest/' +
      '?method=flickr.photos.getRecent&api_key=5ce64d83cff5e9200bdbb2deff8f1ba9' +
      '&extras=' + extras + '&per_page=' + perPage + '&page=' + page +
      '&format=json&nojsoncallback=1';
    return getPhotosFromFlickr(rawUrl);
  }

  function calcFlickrImageSize(width) {
    if (width > VERYLARGE_IMAGE_SIZE) return VERYLARGE_IMAGE_FLICKR_LETTER;
    if (width > LARGE_IMAGE_SIZE) return LARGE_IMAGE_FLICKR_LETTER;
    if (width > MEDIUM_IMAGE_SIZE) return MEDIUM_IMAGE_FLICKR_LETTER;
    if (width > SMAL_IMAGE_SIZE) return SMAL_IMAGE_FLICKR_LETTER;
    return SMAL_IMAGE_FLICKR_LETTER;
  }

  function getPhotosFromFlickr(rawUrl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", rawUrl, false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var flickrPhotos = JSON.parse(xmlhttp.responseText)['photos']['photo'];
      return decorateFlickrPhotos(flickrPhotos);
    } else {
      alert("Flickr service request error...");
      return [];
    }
  }

  function decorateFlickrPhotos(flickrPhotos) {
    var i, photo, photos = [];
    for(i = 0; i < flickrPhotos.length; i++) {
        photo = {
          title: flickrPhotos[i]['title'],
          thumbnail: flickrPhotos[i]['url_' + flickrThumbnailSizeLetter],
          thumbnailWidth: flickrPhotos[i]['width_' + flickrThumbnailSizeLetter],
          original: flickrPhotos[i]['url_' + flickrOriginalSizeLetter],
          originalWidth: flickrPhotos[i]['width_' + flickrOriginalSizeLetter]
        };
        photos.push(photo);
    }
    return photos;
  }

  this.getElem = getElem;
}