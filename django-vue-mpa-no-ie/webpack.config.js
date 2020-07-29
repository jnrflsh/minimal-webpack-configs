const path = require('path')
const webpack = require('webpack')
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
  'js/main': './assets/js/main.js',
}

/**
 * Takes env and returns array of webpack configs
 * @param {Object} env webpack-command
 * @returns {Object[]} Webpack configuration objects
 */
module.exports = (env, argv) => {
  const envMode = argv.mode || 'production'
  const isDev = envMode === 'development'
  const outputDir = path.resolve('./static/')

  const sharedConfig = {
    mode: envMode,
    context: __dirname,
    entry: entries,
    output: {
      path: outputDir,
      filename: '[name].js',

      // should be same as django STATIC_URL
      publicPath: '/static/',

      // webpack should hash file chunks (but not filenames)
      chunkFilename: "[id]-[chunkhash].js"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
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
        },
        {
          test: /.*/,
          include: path.resolve(__dirname, "assets/img"),
          options: {
            context: path.resolve(__dirname, "static/"),
            name: "[path][name].[ext]",
          },
          loader: "file-loader",
        },
      ]
    },
    resolve: {
      alias: { vue: 'vue/dist/vue.esm.js' },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      // add support for vue single file components
      new VueLoaderPlugin(),

      // remove outputDir before build
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

      // Options similar to the same options in webpackOptions.output both options are optional
      new MiniCssExtractPlugin()
    ],
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
      //contentBase: outputDir,
      writeToDisk: true,
      stats: 'minimal', // keep cli output minimal
      hot: true,
    }
  }

  return isDev ? devConfig : prodConfig
}
