/* eslint-disable strict */
/* eslint-env node */

'use strict';

const merge = require('webpack-merge');

module.exports = function(env) {
  env = env || 'production';
  if (env.match(/development|production/) === null) {
    throw new Error('Invalid environment, should be "development" or "production');
  }
  const baseConfig = require('./config/base');
  const specificConfig = require('./config/' + env + '.js');
  return merge(baseConfig, specificConfig);
};
