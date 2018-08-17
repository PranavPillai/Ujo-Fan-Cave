import React from 'react';
import visComp from 'ujo-style-guide';
import Navbar from '../components/Navbar/Navbar';
import { Segment } from 'semantic-ui-react';

const Row = visComp.Row;
const Col = visComp.Col;

const FanPageGeneric = () =>
  (<div className="fan-page">
      <div className="container">
        <Row>
          <Col lg={3}>
            <Navbar />
          </Col>
          <Col lg={9} lgOffset={1}>
            <Row className="section-header">
              <Col xs={12} sm={12} md={6} lg={6}>
                <Segment raised><h1>Welcome to the beat! Explore your badges on the left</h1></Segment>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>)

export default FanPageGeneric;