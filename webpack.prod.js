/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  entry: ['@babel/polyfill', './src/client'],
});
