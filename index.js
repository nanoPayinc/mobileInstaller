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

var isEmpty = function(str) {
  return (!str || 0 === str.length);
}

var openAppOrWebpage = function () {
  var ua = navigator.userAgent;
  var params = getQueryParams();
  var urlData = window.location.href.split(window.location.host + '/')[1];
  var appName = getAppName(urlData);
  var mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  var message = '';
  var key = Object.keys(params)[0];
  
  if(!(isEmpty(key) && isEmpty(params.key))) {
    message = decodeURIComponent(params.message);
  }
  
  var nanopay = document.getElementById('message');
  var mintchip = document.getElementById('message2');
  var error = document.getElementById('errorMessage');
  error.style.display = 'none';

  if (appName === 'mintchip') {
    nanopay.style.display = 'none';
    document.title = 'MintChip™';
    mintchip.style.display = 'block';
    mintchip.setAttribute('class', 'shown');
    if(!(isEmpty(message))) {
      error.getElementsByTagName("p")[0].innerHTML = message;
      error.getElementsByTagName('img')[0].src = '/mintchip-logo.png';
      mintchip.style.display = 'none';
      error.style.display = 'block';
      mintchip.removeAttribute('class');
      error.setAttribute('class', 'shown');
    }
  } else {
    nanopay.style.display = 'block';
    document.title = 'nanoPay™';
    mintchip.style.display = 'none';
    nanopay.setAttribute('class', 'shown');
    if(!(isEmpty(message))) {
      error.getElementsByTagName("p")[0].innerHTML = message; 
      error.getElementsByTagName("p")[0].style.color = '#9e0b39';
      error.getElementsByTagName('img')[0].src = '/nanopay_logo.png';
      nanopay.style.display = 'none';
      error.style.display = 'block';
      nanopay.removeAttribute('class');
      error.setAttribute('class', 'shown');
    }
  }
  
  if( !mobileRegex.test(ua) ) {
    if(isEmpty(message)) {
      var elem = document.getElementsByClassName('shown')[0];
      elem.getElementsByTagName('p')[0].innerHTML = 'Please open the mobile app.';
      return;
    }
    return;
  }

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

window.onload = openAppOrWebpage;

