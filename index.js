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

  if (ua.match(/Android/i)) {
    window.open(window.location.href, '_self');
    return;
  }

  var isIOS = ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i);

  if (isIOS) {
    var appName = getAppName();
    urlData = urlData.replace(appName + '/', '')

    window.open(appName + '://' + urlData, '_self');
    return;
  }
};

window.onload = openMobileApp;