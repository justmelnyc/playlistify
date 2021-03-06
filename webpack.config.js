'use strict'
var webpack = require('webpack')
var path = require('path')
var loaders = require('./webpack.loaders')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '3000'

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './client/index.jsx' // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'fs': '{}'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx' ]
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: './public',
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  watch: true,
  plugins: [
    new webpack.NoErrorsPlugin()
    // new HtmlWebpackPlugin({
    //  template: './public/index.html'
    // }),
  ]
}
