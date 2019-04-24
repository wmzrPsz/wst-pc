const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const zopfli = require('@gfx/zopfli')
var path = require('path')
function resolve (dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: '/',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: '',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [ /* string or regex */ ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: () => {},

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    // extract: true,

    // 是否开启 CSS source map？
    sourceMap: true,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    //      open: process.platform === 'darwin',
    //      openPage: "",
    // host: 'localhost',
    disableHostCheck: true,
    port: 8080,
    https: false,
    hotOnly: false, ////热更新（webpack已实现了，这里false即可）
    open: false, ////浏览器自动打开页面
    historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    //    proxy: {
    //        "/interface": 'http://47.105.70.4:8989/meiguotong/a/interface',
    //    } , // string | Object
    // proxy: 'http://localhost:8081',
    proxy: {
      [process.env.VUE_APP_PROXY_API]: {
        target: process.env.VUE_APP_APIROOT,
        ws: true, //如果要代理 websockets
        changeOrigin: true,
        pathRewrite: {
          ['^'+process.env.VUE_APP_PROXY_API]: '/'
        }
      },
      // "/test": {
      //   target: "http://47.106.254.114:8080/shangxueyuan/a/interface/",
      //   ws: true, //如果要代理 websockets
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/test": '/'
      //   }
      // },
    },
    before: app => {

    }
  },

  //configureWebpack 是Vue CLI3.0 中用于配置 webpack 插件参数的地方，你在这里设置，会新建或者覆盖 webpack 默认配置。
  //webpack ProvidePlugin 的含义是创建一个全局的变量，使这个变量在 webpack 各个模块内都可以使用。
  //这里的配置含义是创建 '$'、'jQuery'、'window.jQuery' 三个变量指向 jquery 依赖，创建 'Popper' 变量指向 popper.js 依赖。
  configureWebpack: config => {

    // config.resolve = {
    //   extensions: ['.js', '.vue', '.json','.css'],
    //   // 别名配置
    //   alias: {
    //     '@': resolve('src'),
    //     'assets': resolve('src/assets'),
    //     'components': resolve('src/components'),
    //     'getData': resolve('src/utils/getData'),
    //     'images': resolve('src/assets/images'),
    //   }
    // },

    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    )

    // 生产环境
    if (process.env.NODE_ENV === 'production') {


      //Node 11.7.0及更高版本中对Brotli的内置支持：Brotli压缩
      // config.plugins.push(
      //   new CompressionPlugin({
      //     filename: '[path].br[query]',
      //     algorithm: 'brotliCompress',
      //     test: /\.(js|css|json|txt|html|ico|svg)$/,
      //     compressionOptions: {
      //       level: 9
      //     },
      //     threshold: 10240,
      //     minRatio: 0.1,
      //     deleteOriginalAssets: false
      //   })
      // );

      //开启zopfli压缩
      config.plugins.push(
        new CompressionPlugin({
          compressionOptions: {
            numiterations: 15
          },
          algorithm(input, compressionOptions, callback) {
            return zopfli.gzip(input, compressionOptions, callback);
          },
          threshold: 10240,
          test: /\.(js|css|json|txt|html|ico|svg)$/,
          minRatio: 0.1,
          deleteOriginalAssets: false
        })
      )

      //去除多余的css
      // config.plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([
      //       path.join(__dirname, './src/index.html'),
      //       path.join(__dirname, './**/*.vue'),
      //       path.join(__dirname, './src/**/*.js')
      //     ])
      //   })
      // );

    } else {
      // 开发环境
    }
  },
  chainWebpack: (config) => {

    //修复HMR(热更新) 启用后，符号链接的资源将解析为其实际路径，而不是其符号链接位置。
    config.resolve.symlinks(true);

    //配置目录别名
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('images', resolve('src/assets/images'))
      .set('style', resolve('src/assets/style'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('getData', resolve('src/api/getData'))
    .externals =  ['.js', '.vue', '.css' ]

    //修复延迟加载路由错误：循环依赖
    config.plugin('html').tap(args => {
      args[0].chunksSortMode = 'none';
      return args;
    });

    //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    config.externals = {
      '@babel/polyfill': '@babel/polyfill',
      'element-ui': 'ElementUI ',
      'bootstrap': 'bootstrap',
      'vue-router':'VueRouter',
      'vuex': 'Vuex',
      'jquery': 'jquery',
      'vue-lazyload': 'VueLazyload',
      // 'vant': 'vant',
      'vue': 'Vue'
    }


  },

  // 第三方插件的选项
  pluginOptions: {

  }
}