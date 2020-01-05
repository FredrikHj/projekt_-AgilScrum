import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { StartPage, LobbyPage, GamePage } from '../components';

const routes = (
  <Router>
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/lobby" component={LobbyPage} />
      <Route path="/game/:id" component={GamePage} />
    </Switch>
  </Router>
);

export default routes;
