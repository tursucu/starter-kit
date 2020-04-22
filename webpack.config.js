const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', 'webpack-hot-middleware/client', './src/client'],
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              [
                'babel-plugin-styled-components',
                {
                  ssr: true,
                  displayName: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        extractComments: 'all',
      }),
    ],
  },
};
