const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Concat and output CSS-files

module.exports = (env = {}) => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
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
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader?indentedSyntax'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: { vue: 'vue/dist/vue.esm.js' }
  },
  plugins: [
    // handle vue files
    new VueLoaderPlugin(),
    // extracts css from js files
    new MiniCssExtractPlugin()
  ],
  devServer: {
    hot: true, // enable hot reloading in browser
    stats: 'minimal', // keep cli output minimal
    overlay: true // show error overlay in browser
  }
})

