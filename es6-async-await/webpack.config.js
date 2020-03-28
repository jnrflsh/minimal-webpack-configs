const path = require('path')
const webpack = require('webpack')

module.exports = (env = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          // presets-env with useBuiltsIns: usage only injects helpers/polyfills for used functions
          presets: [
            ['@babel/preset-env', { useBuiltIns: 'usage', corejs: '3' }]
          ],
          // plugin-transform-runtime reduces bundle size by only including helpers/polyfill once
          plugins: [['@babel/plugin-transform-runtime', { corejs: '3' }]]
        }
      },
    ]
  },
  plugins: [],
  devServer: {
    hot: true, // enable hot reloading in browser
    stats: 'minimal', // keep cli output minimal
    overlay: true // show error overlay in browser
  }
})

