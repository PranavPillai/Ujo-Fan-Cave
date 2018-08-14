import React from 'react';
import visComp from 'ujo-style-guide';
import ChatBox from '../components/ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage, getMessages, clearMessages } from '../store/chat/actions';
import './fanpage.css';

const Row = visComp.Row;
const Col = visComp.Col;

class FanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      room: this.props.match.params.id,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearMessages();
    this.props.getMessages(this.props.match.params.id);
  }

  componentDidUpdate(props) {
    const { id } = this.props.match.params;
    if(id !== this.state.room) {
      this.setState({room: id});
      this.props.clearMessages();
      this.props.getMessages(this.props.match.params.id);
    }
    console.log(this.state.room, props.match.params.id);
    // console.log('hey there');
    // props.clearMessages();
    // props.getMessages(props.match.params.id);
    // this.props.setRoom(this.props.match.params.id);
  }

  onChange(e) {
    this.setState({input: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const message = this.state.input;
    this.setState({input: ''});
    this.props.sendMessage(message, this.props.match.params.id);
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
                  <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} />
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
    room: state.chat.room,
    messages: state.chat.messages,
  };
}

export default connect(
  mapStateToProps,
  {
    sendMessage,
    getMessages,
    clearMessages,
  }
)(FanPage);
