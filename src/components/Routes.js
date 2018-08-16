import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import FanPage from '../pages/FanPage';
import HomePage from '../pages/HomePage';
import FanPageGeneric from '../pages/FanPageGeneric';
import visComp from 'ujo-style-guide';

const Row = visComp.Row;
const Col = visComp.Col;

const Routes = () =>
  <Router history={history}>
    <Row>
      <Col lg={12}>
        <Switch>
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/pages/' component={() => <FanPageGeneric />} />
          <Route path='/pages/:id' component={FanPage} />
        </Switch>
      </Col>
    </Row>
  </Router>

export default Routes;
