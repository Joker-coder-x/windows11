# windows11 in web

- 开发框架:vue3.2
- CSS预处理器: scss


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
    - modules 子模块目录
      - task 任务模块
      - view 视图管理模块
      - system 系统模块
      - layout 布局模块
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
    - namespace.js 该文件命名空间工具函数
    - constant.js 该文件存放一些常量
    - dom.js 该文件存放操作dom的工具方法
  - transitioin 存放封装好的过渡动画组件
  - plugins 插件目录
    - widget app窗口插件
  - App.vue 入口根组件
  - main.js 入口文件
  - config 项目内部配置文件目录
    - config.js 主配置文件