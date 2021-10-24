const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports={
    chainWebpack:(config)=>{
      // 配置目录别名
      config.resolve.alias
       .set('@', resolve('./src'))
       .set('components', resolve('./src/components'))
       .set('views', resolve('./src/views'))
       .set('assets', resolve('./src/assets'))
       .set('styles', resolve('./src/styles'))
       .set('utils', resolve('./src/utils'))
       .set('router', resolve('./src/router'))　
    },

    pluginOptions: {
      // 配置scss变量文件和mixin文件自动化导入
      'style-resources-loader': {
        'preProcessor': 'stylus',
        'patterns': [
          resolve('./src/styles/variables.scss')
        ]
      }
    }
};
