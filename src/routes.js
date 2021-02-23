import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Construction from './pages/Construction';
import Tasks from './pages/Tasks'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/construction" component={Construction} />
      <Route path="/tasks" component={Tasks} />
    </Switch>
  );
}