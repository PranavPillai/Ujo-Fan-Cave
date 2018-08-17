import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
import history from '../history';
import FanPage from '../pages/FanPage';
import HomePage from '../pages/HomePage';
import FanPageGeneric from '../pages/FanPageGeneric';
import visComp from 'ujo-style-guide';

const Row = visComp.Row;
const Col = visComp.Col;

const Routes = () => {
  const baseURL = process.env.PUBLIC_URL;
  return (
    <Router history={history} basename={baseURL}>
      <Row>
        <Col lg={12}>
          <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={baseURL + '/'} component={HomePage} />
            <Route exact path={'/pages/'} component={() => <FanPageGeneric />} />
            <Route exact path={baseURL + '/pages/'} component={() => <FanPageGeneric />} />
            <Route path={'/pages/:id'} component={FanPage} />
            <Route path={baseURL + '/pages/:id'} component={FanPage} />
          </Switch>
        </Col>
      </Row>
    </Router>
  );
}

export default Routes;
