/* eslint-disable strict */
/* eslint-env node */

'use strict';

const {resolve, join} = require('path');
const {NamedModulesPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cwd = resolve(__dirname, '..');

module.exports = {
  context: join(cwd, 'src'),

  entry: {
    app: './index.jsx'
  },

  output: {
    hashDigestLength: 8,
    filename: '[name]-[hash].min.js',
    path: join(cwd, 'dist/'),
    publicPath: ''
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },

  plugins: [
    new NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: './index.ejs'
    })
  ],

  devServer: {
    contentBase: false,
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true
    },
    host: '0.0.0.0',
    port: 8081,
    proxy: {},
    open: false,
    openPage: '',
    historyApiFallback: {
      index: '/'
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              enforce: 'pre',
              emitError: false,
              emitWarning: true
            }
          }
        ]
      },

      {
        test: /\.(eot|woff|woff2|svg|ttf)$/,
        include: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      },

      {
        test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[name]-[hash].[ext]',
          outputPath: 'assets/',
          publicPath: 'assets/'
        }
      }
    ]
  }
};
