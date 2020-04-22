import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { AuthContext } from './helpers/withAuth';

function Router() {
  const { data, loading } = useContext(AuthContext);
  if (loading) {
    return null;
  }

  return (
    <Switch>
      <Route exact path="/login">
        {data.currentUser ? <Redirect to="/dashboard" /> : <Login />}
      </Route>
      <Route exact path="/dashboard">
        {!data.currentUser ? <Redirect to="/login" /> : <Dashboard />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default Router;
