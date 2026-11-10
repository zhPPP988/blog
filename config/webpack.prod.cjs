const { merge } = require('webpack-merge')
const common = require('./webpack.common.cjs')

module.exports = merge(common, {
  mode: 'production',

  devtool: false,

  output: {
    filename: 'js/[name].[contenthash:8].js'
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    },

    runtimeChunk: 'single'
  }
})