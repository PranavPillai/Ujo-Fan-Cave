import React from 'react';
import visComp from 'ujo-style-guide';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import sendImg from '../../assets/send.png';
import Message from './Message';
import './styles.css';

const Row = visComp.Row;
const Col = visComp.Col;

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    }
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
    this.setState({open: this.props.open});
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
      <div className="chat-box modal-content-container">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ul className="messages" ref="messageList">
              {
                this.props.messages.map((messageObj) => {
                  return <Message key={messageObj.time} message={messageObj} address={address}/>;
                })
              }
              <li style={{float: 'left', clear: 'both', listStyle: 'none',}} ref={(el) => {this.messagesEnd = el; }}/>
            </ul>
            <Form className="sendBar">
              <Form.Field className="input-container" onSubmit={onSubmit}>
                <input className='inputBar' type="text" value={input} onChange={onChange} />
                <Button basic color='pink' className='chatButton' type="submit" onClick={onSubmit}>
                  <img src={sendImg} alt="send"/>
                </Button>
              </Form.Field>
            </Form>
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
