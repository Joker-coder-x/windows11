/**
 * 该文件存放一些页面加载初始化之前的逻辑
 */


document.oncontextmenu = function (e){
  e = e || window.event;
  e.preventDefault();
}