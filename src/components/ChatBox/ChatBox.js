import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';

const Row = visComp.Row;
const Col = visComp.Col;

class ChatBox extends React.Component {
  render() {
    return (
      <div className="chat-box">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <form>
              <input type="text" value={this.props.input} onChange={this.props.onChange}/>
              <button type="submit" onClick={this.props.onSubmit}>Hey</button>
            </form>
            <div className="messages">
              {
                this.props.messages.map((messageObj) => {
                  return messageObj.message;
                })
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
  };
}

export default connect(mapStateToProps)(ChatBox);