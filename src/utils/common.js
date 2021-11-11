/**
 * 该文件存放一些页面加载初始化之前的逻辑
 */



// 阻止默认鼠标右键点击的菜单栏弹出
document.oncontextmenu = function (e){
  e = e || window.event;
  e.preventDefault();
}