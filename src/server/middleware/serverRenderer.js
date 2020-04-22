import React from 'react';
import fetch from 'node-fetch';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToStringWithData } from '@apollo/react-ssr';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import App from '../../app/App';
import HTML from '../components/html';

const routerContext = {};

const serverRenderer = async (req, res) => {
  // Connect API
  const client = await new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: process.env.API_ROOT,
      credentials: 'same-origin',
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const sheet = new ServerStyleSheet();

  const Application = (
    <ApolloProvider client={client}>
      <Router location={req.url} context={routerContext}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </Router>
    </ApolloProvider>
  );

  // Server Side Rendering
  renderToStringWithData(Application)
    .then((content) => {
      const initialApolloState = client.extract();
      const helmet = Helmet.renderStatic();
      const styleTags = sheet.getStyleElement();
      const html = (
        <HTML
          content={content}
          state={initialApolloState}
          styleTags={styleTags}
          helmet={helmet}
        />
      );

      return res.send(`<!DOCTYPE html>\n${renderToStaticMarkup(html)}`);
    })
    .catch(() => {
      res.status(500);
      res.send('<!doctype html><html><body><p>Error</p></body></html>');
      res.end();
    });
};

export default serverRenderer;
