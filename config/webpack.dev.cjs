const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    port: 8080,

    open: true,
    hot: true,

    historyApiFallback: true,

    proxy: [
      {
        context: ['/login', '/regist', '/getPbk'],
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    ]
  }
})