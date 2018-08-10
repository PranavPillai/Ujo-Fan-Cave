import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import SimpleStorage from './SimpleStorage';
import HomePage from '../pages/HomePage';

const Routes = () =>
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path='/' component={SimpleStorage} />
        <Route exact path='/home' component={HomePage} />
      </Switch>
    </div>
  </Router>

export default Routes;
