const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: 'handlebars-loader'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    })
  ],

  resolve: {
    extensions: ['.js']
  }
}