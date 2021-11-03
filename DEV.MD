# windows11 in web

开发框架:vue3.2
CSS预处理器: scss


## 需求目标：
1. 面向的浏览器版本：版本比较新的浏览器（不兼容IE）
2. 支持的分辨率: 1920 * 1080

桌面图标大小: js动态计算
桌面布局: 8 * 20

## 文件目录
- public 公开资源
- src
  - assets
    - icons 存放icon图标
      - bg      存放背景图片
      - audio   存放音频系列图标
      - menu    存放右键菜单栏相关的图标
      - ui      一些小图标
      - win     windows内置图标
    - datas 存放一些静态伪数据文件夹
  - components 存放组件目录
    - apps    存放应用组件文件夹（系统组件以 "System" 命名开头）
    - common  存放通用组件文件夹
    - Desktop 存放桌面系列组件文件夹
    - Taskbar 存放底部状态栏系列组件文件夹
  - composables 组合式API模块目录
  - router 存放路由目录
  - store 状态管理目录
  - views 存放视图目录
  - styles 样式文件目录
    - iconfont 字体图标库文件夹
    - animation.scss 存放动画相关的文件
    - common.scss 通用的全局样式
    - mixins.scss 混入相关
    - variables.scss 存放scss变量或者css3变量
    - normalize.scss 样式初始化文件
    - index.scss 入口样式文件
  - utils 工具库目录
    - common.js 该文件存放一些页面加载初始化之前的逻辑
  - App.vue 入口根组件
  - main.js 入口文件
  - config.js 项目内部配置文件

## 更新日志
- 2021/10/27 增加布局模块、时间面板组件、app图标拖拽算法模块
- 2021/10/28 增加桌面右键菜单和任务栏右键菜单模块
- 2021/10/29 增加系统菜单面板应用
- 2021/10/30 增加系统搜索面板应用
- 2021/11/2  增加系统推荐资讯面板模块
- 2021/11/3  增加系统状态控制面板、增加护眼模式、省点模式、亮度调节、音量调节等逻辑代码

## issue
