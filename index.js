var getQueryParams = function () {
  var queryObject = {};

  window.location.search.substr(1).split('&').forEach(function (item) {
    queryObject[item.split('=')[0]] = item.split('=')[1];
  });

  return queryObject;
};

var getAppName = function (urlData) {
  return urlData.split('/')[0];
};

var openMobileApp = function () {
  var ua = navigator.userAgent;
  var params = getQueryParams();
  var urlData = window.location.href.split(window.location.host + '/')[1];

  var debug = document.getElementById('debug');

  debug.innerHTML = 'URL: ' + window.location.href + '<br /><br />' + 'UA: ' + ua;

  if (ua.match(/Android/i)) {
    window.open(window.location.href, '_self');
    return;
  }

  var isIOS = ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i);

  if (isIOS) {
    var appName = getAppName(urlData);
    urlData = urlData.replace(appName + '/', '')

    window.open(appName + '://', '_self');
    return;
  }
};

window.onload = openMobileApp;