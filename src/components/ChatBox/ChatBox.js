import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';
import Message from './Message';

const Row = visComp.Row;
const Col = visComp.Col;

class ChatBox extends React.Component {
  render() {
    const {
      input, onChange, onSubmit, address
    } = this.props;
    return (
      <div className="chat-box">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <form>
              <input type="text" value={input} onChange={onChange}/>
              <button type="submit" onClick={onSubmit}>Hey</button>
            </form>
            <div className="messages">
              {
                this.props.messages.map((messageObj) => {
                  return <Message key={messageObj.time} message={messageObj} address={address}/>;
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
    user: state.user.user,
    address: state.user.user.ethereumAddress,
  };
}

export default connect(mapStateToProps)(ChatBox);