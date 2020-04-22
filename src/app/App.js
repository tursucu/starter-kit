import React from 'react';
import Router from './Router';
import { AuthProvider } from './helpers/withAuth';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router />
    </AuthProvider>
  );
}

export default App;
