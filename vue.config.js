const path = require('path');

module.exports={
  chainWebpack:(config)=>{
    // 配置目录别名
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('composables', resolve('./src/composables'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
      .set('styles', resolve('./src/styles'))
      .set('utils', resolve('./src/utils'))
      .set('router', resolve('./src/router'))
      .set('store', resolve('./src/store'))
      .set('transition', resolve('./src/transition'))

    // 处理.ico文件
    config.module
      .rule('image')
      .test(/\.ico$/)
      .use('url-loader')
      .loader('url-loader')

    // 每个单文件组件 scss 中导入 ./src/styles/variables.scss
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
  },

  pluginOptions: {
    // 配置scss变量文件和mixin文件自动化导入
    'style-resources-loader': {
      'preProcessor': 'stylus',
      'patterns': [
        resolve('./src/styles/variables.scss'),
        resolve('./src/styles/mixins.scss')
      ]
    }
  }
};

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/styles/variables.scss'),
        resolve('./src/styles/mixins.scss')
      ],
    });
}
