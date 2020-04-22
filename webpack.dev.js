/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  entry: ['@babel/polyfill', 'webpack-hot-middleware/client', './src/client'],
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
