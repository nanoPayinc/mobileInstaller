'use strict';

var appName = 'mintchip';

var getQueryParams = function () {
  var queryObject = {};

  window.location.search.substr(1).split('&').forEach(function (item) {
    queryObject[item.split('=')[0]] = item.split('=')[1];
  });

  return queryObject;
};

var openMobileApp = function () {
  var ua = navigator.userAgent;
  var params = getQueryParams();
  var urlData = window.location.href.split(window.location.host + '/')[1];

  var mintchip = document.getElementById('messageMintchip');
  document.title = 'MintChip';
  mintchip.style.display = 'block';

  if (ua.match(/Android/i)) {
    setTimeout(function () {
      window.open(window.location.href, '_self');
    }, 1000);
    return;
  }

  var isIOS = ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i);

  if (isIOS) {
    urlData = urlData.replace(appName + '/', '')

    setTimeout(function () {
      window.open(appName + '://' + urlData, '_self');
    }, 1000);
    return;
  }
};

window.onload = openMobileApp;
