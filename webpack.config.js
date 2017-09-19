const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './extension'),
    publicPath: '/extension/',
    filename: 'bugbox.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2|eot)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'app$': path.resolve(__dirname, 'src/App.vue'),
      'assets': path.resolve(__dirname, 'assets'),
      'components': path.resolve(__dirname, 'src/components'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'lib': path.resolve(__dirname, 'src/lib'),
      'services': path.resolve(__dirname, 'src/services'),
      'store': path.resolve(__dirname, 'src/store')
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new Dotenv({
      safe: true
    })
  ],
  devtool: '#eval-source-map'
}

if (isProd) {
  module.exports.devtool = '#source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
