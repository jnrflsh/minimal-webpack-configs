const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env = {}) => ({
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: '@vue/runtime-dom'
    }
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    hot: true, // enable hot reloading in browser
    stats: 'minimal', // keep cli output minimal
    overlay: true // show error overlay in browser
  }
})
