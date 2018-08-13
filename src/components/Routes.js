import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import Navbar from '../components/Navbar/Navbar';
import FanPage from '../pages/FanPage';

const Routes = () =>
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/:id' component={FanPage} />
      </Switch>
    </div>
  </Router>

export default Routes;
