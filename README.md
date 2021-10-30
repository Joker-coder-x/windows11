# windows11

## 用法
```
npm install
```

### 启动
```
npm run serve
```

### 打包构建
```
npm run build
```

## 需求目标：
1. 面向的浏览器版本：版本比较新的浏览器（不兼容IE）
2. 支持的分辨率: 1920 * 1080

桌面图标大小: 90 * 90
桌面布局: 8 * 20

## 文件目录
- public 公开资源
- src
  - assets
    - icons 存放icon图标
  - components 存放组件目录
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
  - App.vue 入口根组件
  - main.js 入口文件

## 更新日志
- 2021/10/27 增加布局模块、时间面板组件、app图标拖拽算法模块
- 2021/10/28 增加了桌面右键菜单和任务栏右键菜单模块
- 2021/10/29 增加了系统菜单面板应用
