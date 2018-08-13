import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import SimpleStorage from './SimpleStorage';
import BadgeContract from './BadgeContract';
import HomePage from '../pages/HomePage';
import Chat from '../pages/Chat';

const Routes = () =>
  <Router history={history}>
      <div>
        <span>
          <h1 id="main-header">Boilaaa</h1>
        </span>
        <Switch>
          <Route exact path='/' component={SimpleStorage} />
          <Route exact path='/badges' component={BadgeContract} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/chat' component={Chat} />
        </Switch>
      </div>
    </Router>

export default Routes;
