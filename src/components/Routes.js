import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import Navbar from '../components/Navbar/Navbar';
import FanPage from '../pages/FanPage';
import visComp from 'ujo-style-guide';

const Row = visComp.Row;
const Col = visComp.Col;

const Routes = () =>
  <Router history={history}>
    <Row>
      <Col lg={3}>
        <Navbar />
      </Col>
      <Col lg={9}>
        <Switch>
          <Route exact path='/:id' component={FanPage} />
        </Switch>
      </Col>
    </Row>
  </Router>

export default Routes;
