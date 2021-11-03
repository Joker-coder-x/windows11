/**
 * 项目配置文件，暂时还是作用不大，后面慢慢把配置集中到这个文件
 */

export default {
  // 桌面图标布局
  layout: {
    row: 8,
    column: 20,
    rowGap: 15,
    columnGap: 4
  },
  apps: [
    {
      icon: require("assets/icons/code.png"),
      name: 'VsCode',
      x: 0,
      y: 0,
      appid: null
    },
    {
      icon: require("assets/icons/cloud-music.png"),
      name: '网易云音乐',
      x: 0,
      y: 0,
      appid: null
    }
  ]
};