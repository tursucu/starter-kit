/* eslint-disable comma-dangle */
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setContext } from 'apollo-link-context';
import App from '../app/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:4002/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Cookies.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
