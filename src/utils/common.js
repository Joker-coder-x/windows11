/**
 * 该文件存放一些页面加载初始化之前的逻辑
 */

import { checkBrowser } from "./dom";

// 阻止默认鼠标右键点击的菜单栏弹出
document.oncontextmenu = function (e){
  e = e || window.event;
  e.preventDefault();
}

const browserInfo = checkBrowser();
if (browserInfo.mobile) {
  alert('为了不影响您的体验，请在PC端设备上浏览本站点。');
}

if (browserInfo.browser === 'Microsoft Internet Explorer') {
  alert('抱歉：本站点不支持IE浏览器，请更换其他更高版本的浏览器预览！')
}

if (Proxy === undefined || typeof(Proxy) !== 'function') {
  alert('浏览器版本过低，请升级您的浏览器再来！');
}