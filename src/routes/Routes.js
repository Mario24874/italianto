import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Dashboard from '../components/pages/Dashboard';
import Home from '../components/pages/Home'; // Asegúrate de importar el componente Home

function Routes() {
  const { user } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route path="/" exact component={Home} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default Routes;