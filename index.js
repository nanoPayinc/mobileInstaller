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
  if (window.location.href === 'readygo') {
    var nanopay = document.getElementById('message');
    nanopay.style.display = 'block';
    document.title = 'nanoPay™';
    var mintchip = document.getElementById('message2');
    mintchip.style.display = 'none';
  }
  else if (window.location.href === 'mintchip') {
    var nanopay = document.getElementById('message');
    nanopay.style.display = 'none';
    document.title = 'MintChip™';
    var mintchip = document.getElementById('message2');
    mintchip.style.display = 'block';
  }
  var ua = navigator.userAgent;
  var params = getQueryParams();
  var urlData = window.location.href.split(window.location.host + '/')[1];

  if (ua.match(/Android/i)) {
    setTimeout(function () {
      window.open(window.location.href, '_self');
    }, 1000);
    return;
  }

  var isIOS = ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i);

  if (isIOS) {
    var appName = getAppName(urlData);
    urlData = urlData.replace(appName + '/', '')

    setTimeout(function () {
      window.open(appName + '://' + urlData, '_self');
    }, 1000);
    return;
  }
};

window.onload = openMobileApp;

