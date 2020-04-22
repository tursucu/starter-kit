import React from 'react';
import Router from './Router';
import { AuthProvider } from './helpers/withAuth';

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
