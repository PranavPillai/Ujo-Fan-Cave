import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';
import sendImg from '../../assets/send.png';
import attachFile from '../../assets/attach-file.png';
import Message from './Message';
import './styles.css';

const Row = visComp.Row;
const Col = visComp.Col;

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    const {
      input, onChange, onSubmit, address
    } = this.props;
    return (
      <div className="chat-box">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ul className="messages" ref="messageList" onScroll={this.onScroll}>
              {
                this.props.messages.map((messageObj) => {
                  return <Message key={messageObj.time} message={messageObj} address={address}/>;
                })
              }
              <li style={{float: 'left', clear: 'both', listStyle: 'none',}} ref={(el) => {this.messagesEnd = el; }}/>
            </ul>
            <form className="sendBar">
              <input className='inputBar' type="text" value={input} onChange={onChange} />
              <button className='chatButton' type="submit" onClick={onSubmit}>
                <img src={sendImg} alt="send"/>
              </button>
              <button className='chatButton'>
                <img src={attachFile} alt="attach"/>
              </button>
            </form>
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
