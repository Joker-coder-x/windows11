/**
 * @description 绑定事件处理程序兼容版API
 * @param {*} el
 * @param {*} type
 * @param {*} fn
 * @param {*} useCapture
 */
export function $on (el, type, fn, useCapture) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? useCapture : false;
  if (el.addEventListener) {
    $on = function (el, type, fn, useCapture){
      el.addEventListener(type, fn, useCapture);
    };
  } else if(el.attachEvent) {
    $on = function (el, type, fn){
      el.attachEvent('on' + type, function _() {
        fn.__warpperFn__ = _;
        fn.call(el);
      });
    };
  } else {
    $on = function (el, type, fn) {
      el['on' + type] = fn;
    };
  }

  $on(el, type, fn, useCapture);
}

/**
 * @description 移除绑定事件处理程序兼容版API
 * @param {*} el
 * @param {*} type
 * @param {*} fn
 * @param {*} useCapture
 */
export function $off (el, type, fn, useCapture) {
  var useCapture = arguments.length > 3 && arguments[3] !== undefined ? useCapture : false;
  if (el.removeEventListener) {
    $off = function (el, type, fn, useCapture) {
      el.removeEventListener(type, fn, useCapture);
    };
  } else if(el.detachEvent) {
    $off = function (el, type, fn) {
      el.detachEvent('on' + type, fn.__warpperFn__ ? fn.__warpperFn__ : fn);
    };
  } else {
    $off = function (el, type, fn){
      el['on' + type] = null;
    };
  }

  $off(el, type, fn, useCapture);
}

/**
 * @description 动态获取样式
 * @param {Element} elem
 * @param {String} prop
 * @returns
 */
export function getStyles (elem, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(elem, null)[prop] : window.getComputedStyle(elem, null);
  } else {
    return prop ? elem.currentStyle[prop] : elem.currentStyle;
  }
}

/**
 * document.documentElement.clientLeft/clientTop 表示文档的偏移（margin) 这两个值在IE8及以下版本的值可能会是undefined
 * 所以才需要 || 0
 */
export function pagePos(e){
  var clientX = e.clientX,
      clientY= e.clientY,
      scrollPos = getScrollOffset();

  return {
      x: (clientX + scrollPos.x) - (document.documentElement.clientLeft || 0),
      y: (clientY + scrollPos.y) - (document.documentElement.clientTop || 0)
  };
}

export function getScrollOffset(){
  if(window.pageXOffset){
      return {
          x: window.pageXOffset,
          y: window.pageYOffset
      }
  }else{
      return {
          x: document.body.scrollLeft + document.documentElement.scrollLeft,
          y: document.body.scrollTop + document.documentElement.scrollTop
      }
  }
}

export function getElemDocPosition(node){
  var oParent = node.offsetParent,
      offsetLeft = node.offsetLeft,
      offsetTop = node.offsetTop;

  while(oParent){
    offsetLeft += oParent.offsetLeft;
    offsetTop  += oParent.offsetTop;
    oParent = oParent.offsetParent;
  }

  return {
    offsetLeft: offsetLeft,
    offsetTop: offsetTop
  };
}

/**
 * @description 检查浏览器信息
 * @returns {Object}
 */
export function checkBrowser(){
	var nVer = navigator.appVersion,
      nAgt = navigator.userAgent,
      browser = navigator.appName,
      version = '' + parseFloat(navigator.appVersion),
      majorVersion,
      nameOffset,
      verOffset,
      ix,
      network = 'unknown';

  // Opera浏览器（老版本）
  if ((verOffset = nAgt.indexOf('Opera')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Opera浏览器（新版本）
  if ((verOffset = nAgt.indexOf('OPR')) != -1) {
    browser = 'Opera';
    version = nAgt.substring(verOffset + 4);
  }
  // IE浏览器
  else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(verOffset + 5);
  }
  // Chrome浏览器
  else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
    browser = 'Chrome';
    version = nAgt.substring(verOffset + 7);
  }
  // Safari浏览器
  else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
    browser = 'Safari';
    version = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf('Version')) != -1) {
      version = nAgt.substring(verOffset + 8);
    }
  }
  // Firefox浏览器
  else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
    browser = 'Firefox';
    version = nAgt.substring(verOffset + 8);
  }
  // IE11+浏览器
  else if (nAgt.indexOf('Trident/') != -1) {
    browser = 'Microsoft Internet Explorer';
    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
  }
// 微信浏览器
  else if (nAgt.indexOf('NetType/') != -1) {
    browser = 'WeiXin';
    if (nAgt.indexOf('NetType/WIFI') != -1) {
        network = 'WIFI';
    }else if(nAgt.indexOf('NetType/2G') != -1) {
        network = '2G';
    }else if(nAgt.indexOf('NetType/3G+') != -1) {
        network = '3G+';
    }
    verOffset = nAgt.lastIndexOf('/')
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
    }
  }
  //其他浏览器
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browser = nAgt.substring(nameOffset, verOffset);
    version = nAgt.substring(verOffset + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  //版本字符串整理
  if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
  if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);
  majorVersion = parseInt('' + version, 10);
  if (isNaN(majorVersion)) {
    version = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  //移动版本
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

  //系统探测
  var os = '';
  var clientStrings = [
    {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
    {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
    {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
    {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
    {s: 'Windows Vista', r: /Windows NT 6.0/},
    {s: 'Windows Server 2003', r: /Windows NT 5.2/},
    {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
    {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
    {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
    {s: 'Windows 98', r: /(Windows 98|Win98)/},
    {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
    {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
    {s: 'Windows CE', r: /Windows CE/},
    {s: 'Windows 3.11', r: /Win16/},
    {s: 'Android', r: /Android/},
    {s: 'Open BSD', r: /OpenBSD/},
    {s: 'Sun OS', r: /SunOS/},
    {s: 'Linux', r: /(Linux|X11)/},
    {s: 'iOS', r: /(iPhone|iPad|iPod)/},
    {s: 'Mac OS X', r: /Mac OS X/},
    {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
    {s: 'QNX', r: /QNX/},
    {s: 'UNIX', r: /UNIX/},
    {s: 'BeOS', r: /BeOS/},
    {s: 'OS/2', r: /OS\/2/},
    {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
  ];
  for (var id in clientStrings) {
    var cs = clientStrings[id];
    if (cs.r.test(nAgt)) {
      os = cs.s;
      break;
    }
  }
  var osVersion = '';
  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }
  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
      break;
    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
      break;
    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  //返回数据集合
  return {
  	//操作系统
	  os: os,
	  //操作系统版本
	  osVersion: osVersion ? osVersion : 'unknown',
	  //是否移动端访问
	  mobile: mobile,
	  //浏览器类型
	  browser: browser,
	  //浏览器版本
	  browserVersion: version,
	  //浏览器major版本
	  browserMajorVersion: majorVersion
  };
}

/**
 * @description 获取电池状态的API
 * @notice  该API不支持IE
 * @returns {Promise}
 */
export function getBatteryManager () {
  return navigator.getBattery();
}

/**
 * @description 设置全屏
 */
export function setFullScreen () {
  var elem = document.body;

  if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
  } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
  } else if (elem.requestFullScreen) {
      elem.requestFullscreen();
  } else {
    //浏览器不支持全屏API或已被禁用
    console.warn('浏览器不支持全屏API或已被禁用!!!');
  }
}

/**
 * @description 退出全屏
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  }
}

/**
 * @description 发送邮件
 * @param {String}
 */
export function sendEmail (emailAddress) {
  const link = document.createElement('a');
  link.href = `mailto:${emailAddress}`;
  link.click();
}

/**
 * @description 跳转链接
 * @param {String} url 需要跳转的url
 */
export function jumpLink (url) {
  const link = document.createElement('a');
  link.href = url;
  link.target ="_blank";
  link.click();
}

