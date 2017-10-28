/* eslint-disable strict */
/* eslint-env node */

'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
  },

  devtool: 'source-map',

  devServer: {
    hot: true,
    disableHostCheck: true
  },

  output: {
    pathinfo: false,
    filename: '[name]-[hash].min.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'

            }
          },
          'sass-loader'
        ]
      }
    ]
  }
};
