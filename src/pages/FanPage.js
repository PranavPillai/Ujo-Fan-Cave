import React from 'react';
import visComp from 'ujo-style-guide';
import openSocket from 'socket.io-client';
import ChatBox from '../components/ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage } from '../store/chat/actions';
import firebase from '../config/firebase';
import './fanpage.css';

const socket = openSocket('http://localhost:8000');
const Row = visComp.Row;
const Col = visComp.Col;

class FanPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      messages: [],
    }
    socket.on('public message', (messageObj) => {
      const messagesCopy = this.state.messages;
      messagesCopy.push(messageObj.message);
      this.setState({messages : messagesCopy});
    });
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    socket.emit('subscribe', {room: this.props.match.params.id});
    const chatRoomRef = firebase.database().ref(this.props.match.params.id);
    chatRoomRef.on('value', (snapshot) => {
      let messages = snapshot.val();
      console.log(messages);
      const newMessages = [];
      for(const message in messages) {
        console.log(messages[message]);
        newMessages.push(messages[message]);
      }
      this.setState({messages: newMessages});
    });
  }

  componentWillUnmount() {
    socket.emit('unsubscribe', {room: this.props.match.params.id});
  }

  onChange(e) {
    this.setState({input: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const message = this.state.input;
    const messages = this.state.messages;
    messages.push(message);
    this.setState({messages});
    socket.emit('message', {room: this.props.match.params.id, message});
    this.setState({input: ''});
    sendMessage(message);
  }

  render() {
    return (
      <div className="fan-page">
        <div className="container">
          <Row>
            <Col lg={10} lgOffset={1}>
              <Row className="section-header">
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h1>Fan Page</h1>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <ChatBox input={this.state.input} messages={this.state.messages} onChange={this.onChange} onSubmit={this.onSubmit} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps,
  {
    sendMessage,
  }
)(FanPage);
