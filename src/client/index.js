/* eslint-disable comma-dangle */
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import App from '../app/App';

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.API_ROOT,
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

function hydrateEntireTree(Component) {
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </ApolloProvider>,
    document.querySelector('#root')
  );
}

hydrateEntireTree(App);

if (module.hot) {
  module.hot.accept('../app/App', () => {
    const NextApp = require('../app/App').default; // eslint-disable-line
    hydrateEntireTree(NextApp);
  });
}
