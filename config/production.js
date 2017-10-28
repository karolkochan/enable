/* eslint-disable strict */
/* eslint-env node */

'use strict';

const {resolve} = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cwd = resolve(__dirname, '..');

module.exports = {
  bail: true,

  devtool: 'source-map',

  devServer: {
    hot: false,
    compress: true
  },

  output: {
    pathinfo: true,
    filename: '[name]-[chunkhash].min.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },

      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name]-[contenthash:8].min.css',
      ignoreOrder: true
    }),

    new CleanWebpackPlugin(['dist'], {
      root: cwd
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
};
