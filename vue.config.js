const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}
const Timestamp = new Date().getTime();
const VUE_APP_Version = "1.1"
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    outputDir: 'dist',
    indexPath: 'index.html',
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('_v', resolve('src/views'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "~@/libs/style.scss";`
            }
        }
    },
    configureWebpack: {
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
            filename: `[name].${VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${VUE_APP_Version}.${Timestamp}.js`
        }

    },
  //   devServer: {
  //     // 设置代理
  //     proxy: {
  //       "/api": {
  //         target: "https://rhzgtest.co-inclusion.org/rhzg-web", // 域名
  //         ws: true, // 是否启用websockets
  //         changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //         pathRewrite: {
  //           "^/api": "/api"
  //         }
  //       }
  //     }
  // }
}

