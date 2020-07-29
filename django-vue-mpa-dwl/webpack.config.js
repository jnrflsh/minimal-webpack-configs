const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker') // Outputs bundle info to json file (used by django webpack-loader)
const VueLoaderPlugin = require('vue-loader/lib/plugin') // Needed to handle vue single file components https://vue-loader.vuejs.org/migrating.html#migrating-from-v14
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Concat and output CSS-files
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // clean output dir on build and watch start https://github.com/johnagan/clean-webpack-plugin

/**
 * Entry points
 * - Add js and scss files
 * - object property is the named used in bundle-tracker / django webpack loader e.g.
 */
const entries = {
  'css/main': './assets/scss/main.scss',
  'js/main': './assets/js/main.js'
}

/**
 * Takes env and returns array of webpack configs
 * @param {Object} env webpack-command
 * @returns {Object[]} Webpack configuration objects
 */
module.exports = (env, argv) => {
  const envMode = argv.mode || 'production'
  const isDev = envMode === 'development'
  const outputDir = path.resolve('./static/bundles/')

  const sharedConfig = {
    mode: envMode,
    context: __dirname,
    entry: entries,
    output: {
      path: outputDir,
      filename: '[name]-[hash].js',
      publicPath: '/static/bundles/'
    },
    plugins: [
      // add support for vue single file components
      new VueLoaderPlugin(),

      // save reference to created assets
      new BundleTracker({
        filename: './webpack-stats.json'
      }),

      // remove outputDir before build
      new CleanWebpackPlugin(),

      // Options similar to the same options in webpackOptions.output both options are optional
      new MiniCssExtractPlugin({
        filename: '[name]-[hash].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
      })
    ],
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
          //options: { babelrc: true }
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
      alias: { vue: 'vue/dist/vue.esm.js' },
      extensions: ['*', '.js', '.vue', '.json']
    }
  }

  const prodConfig = sharedConfig

  const devConfig = {
    ...sharedConfig,
    devtool: 'inline-source-map',
    plugins: [
      ...sharedConfig.plugins,
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: outputDir,
      stats: 'minimal', // keep cli output minimal
      hot: true,
      // redirect everything except bundles to django server
      proxy: {
        '!/static/bundles/**': {
          target: 'http://localhost:8000', // points to django dev server
          changeOrigin: true
        }
      }
    }
  }

  return isDev ? devConfig : prodConfig
}
