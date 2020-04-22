/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import serverRenderer from './middleware/serverRenderer';

require('dotenv').config();

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');

const compiler = webpack(webpackConfig);
const app = express();

if (process.env.DEV === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      index: false,
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(
  cors({
    origin: process.env.BASE_ROOT,
    credentials: true,
    // eslint-disable-next-line comma-dangle
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static('build'));

app.get(['*/:param', '*'], (req, res) => {
  res.status(200);
  serverRenderer(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
