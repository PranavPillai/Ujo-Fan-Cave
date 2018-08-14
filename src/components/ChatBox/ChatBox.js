import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';
import sendImg from '../../assets/send.png';
import attachFile from '../../assets/attach-file.png';
import './styles.css';

const Row = visComp.Row;
const Col = visComp.Col;

class ChatBox extends React.Component {
  render() {
    return (
      <div className="chat-box">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <form className="sendBar">
              <input className='inputBar' type="text" value={this.props.input} onChange={this.props.onChange} />
              <button className='chatButton' type="submit" onClick={this.props.onSubmit}><img src={sendImg} /></button>
              <button className='chatButton'><img src={attachFile} /></button>
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
