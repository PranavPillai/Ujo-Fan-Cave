import React from 'react';
import visComp from 'ujo-style-guide';
import ChatBox from '../components/ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../store/chat/actions';
import { Menu } from 'semantic-ui-react';
import Navbar from '../components/Navbar/Navbar';
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
    this.onFileUpload = this.onFileUpload.bind(this);
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

  onFileUpload(e) {
    e.preventDefault();
    //const data = new FormData();
    //data.append();
    //data.append();
    const { name, address } = this.props;
    const messageObj = {
      time: Date(),
      name,
      address,
      image: this.state.input,
    };
    console.log(this.state.input);
    this.props.sendMessage(messageObj, this.props.match.params.id);
  }

  renderFanPage(badgeName) {
    return(
      <div className="fan-page">
        <Col lg={3}>
          <Navbar />
        </Col>
        <Row>
          <Col lg={10} lgOffset={1}>
            <Menu secondary className="header">
              <Menu.Item name={badgeName} />
            </Menu>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} onFileUpload={this.onFileUpload}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  renderBadgeNotPurchased() {
    return (<div className="fan-page">
      <div className="container">
        <Row>
          <Col lg={3}>
            <Navbar />
          </Col>
          <Col lg={9} lgOffset={1}>
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
    let currBadgeName = '';
    const { badges, room } = this.props;
    for(const badge in badges) {
      if(badge === room) {
        hasBadge = true;
        currBadgeName = badges[badge].name;
      }
    }
    return hasBadge
      ? this.renderFanPage(currBadgeName)
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
