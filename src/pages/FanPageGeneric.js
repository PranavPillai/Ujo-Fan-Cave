import React from 'react';
import visComp from 'ujo-style-guide';
import Navbar from '../components/Navbar/Navbar';
import { Segment } from 'semantic-ui-react';
import './welcome.css';

const Row = visComp.Row;
const Col = visComp.Col;

const FanPageGeneric = () =>
  (<div className="fan-page fan-page-generic">
      <div className="container">
        <Row>
          <Col lg={3}>
            <Navbar />
          </Col>
          <Col lg={9} lgOffset={1}>
            <Row className="section-header">
              <Col xs={12} sm={12} md={6} lg={6}>
                <Segment raised className="welcome-panel">
                  <h1 className="fan-page-header">Welcome to The Beat!</h1>
                  <h3 className="fan-page-description">
                    Click one of your purchased artist badges on the left to enter their fan page, 
                    featuring personally written posts by the artist themselves as well as a chatroom
                    for all super-fans of the artist to enjoy!
                  </h3>
                </Segment>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>)

export default FanPageGeneric;