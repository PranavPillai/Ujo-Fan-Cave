import React from 'react';
import visComp from 'ujo-style-guide';
import ChatBox from '../components/ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../store/chat/actions';
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
    this.props.setRoom(this.props.match.params.id);
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    if(id !== this.state.room) {
      this.setState({room: id});
      this.props.clearMessages();
      this.props.setRoom(this.props.match.params.id);
    }
  }

  onChange(e) {
    this.setState({input: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, address } = this.props;
    const messageObj = {
      message: this.state.input,
      time: Date(),
      name,
      address,
    };
    this.setState({input: ''});
    this.props.sendMessage(messageObj, this.props.match.params.id);
  }

  renderFanPage() {
    return(
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

  renderBadgeNotPurchased() {
    return (<div className="fan-page">
      <div className="container">
        <Row>
          <Col lg={10} lgOffset={1}>
            <Row className="section-header">
              <Col xs={12} sm={12} md={6} lg={6}>
                <h1>Uh Oh! It seems as if you haven't yet purchased this badge!</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>);
  }

  render() {
    let hasBadge = false;
    const { badges, room } = this.props;
    for(const badge in badges) {
      if(badge === room) {
        hasBadge = true;
      }
    }
    return hasBadge
      ? this.renderFanPage()
      : this.renderBadgeNotPurchased()
  }
}

function mapStateToProps(state) {
  return {
    room: state.chat.room,
    messages: state.chat.messages,
    badges: state.web3.badges,
    address: state.user.user.ethereumAddress,
    name: state.user.user.givenName + ' ' + state.user.user.familyName
  };
}

export default connect(
  mapStateToProps,
  {
    sendMessage,
    clearMessages,
    setRoom,
  }
)(FanPage);
