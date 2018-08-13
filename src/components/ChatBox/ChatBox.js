import React from 'react';
import visComp from 'ujo-style-guide';

const Row = visComp.Row;
const Col = visComp.Col;

class FanPage extends React.Component {

  render() {
    return (
      <div className="fan-page">
        <div className="container">
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <form>
                <input type="text" value={this.props.input} onChange={this.props.onChange}/>
                <button type="submit" onClick={this.props.onSubmit}>Hey</button>
              </form>
              <div className="messages">
                {
                  this.props.messages.map((message) => {
                    return message;
                  })
                }
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FanPage;
