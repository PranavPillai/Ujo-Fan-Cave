import React from 'react';
import visComp from 'ujo-style-guide';
import openSocket from 'socket.io-client';
import ChatBox from '../components/ChatBox/ChatBox';
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
      console.log(messageObj);
      const messagesCopy = this.state.messages;
      messagesCopy.push(messageObj.message);
      this.setState({messages : messagesCopy});
    });
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    socket.emit('subscribe', {room: this.props.match.params.id});
  }

  componentWillUnmount() {
    socket.emit('unsubscribe', {room: this.props.match.params.id});
  }

  onChange(e) {
    this.setState({input: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const messages = this.state.messages;
    messages.push(this.state.input);
    this.setState({messages});
    socket.emit('message', {room: this.props.match.params.id, message: this.state.input});
    this.setState({input: ''});
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

export default FanPage;
