import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../store/chat/actions';
import { postContent, setDashboardRoom } from '../store/dashboard/actions';
import { Menu } from 'semantic-ui-react';
import Navbar from '../components/Navbar/Navbar';
import ChatModal from '../components/Modal/ChatModal';
import Dashboard from '../components/Dashboard/Dashboard';
import cover from '../assets/eaglescover.jpg';
import sendImg from '../assets/send.png';
import './fanpage.css';

const Row = visComp.Row;
const Col = visComp.Col;

class FanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      room: this.props.match.params.id,
      owner: false,
      modalOpen: false,
      content: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitContent = this.submitContent.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  componentDidMount() {
    this.props.clearMessages();
    this.props.setRoom(this.props.match.params.id);
  }

  openModal() {
    this.setState({modalOpen : true});
  }

  closeModal() {
    this.setState({modalOpen : false});
  }

  componentDidUpdate() {
    const { id } = this.props.match.params;
    if(id !== this.state.room) {
      this.setState({room: id, owner: false,});
      this.props.clearMessages();
      this.props.setRoom(this.props.match.params.id);
    }
    const badge = this.props.badges[this.state.room];
    if(badge) {
      const members = badge.members;
      console.log(this.props.address);
      for(const member in members) {
        console.log(members[member].ethereumAddress);
        if(members[member].ethereumAddress === this.props.address) {
          if(!this.state.owner) {
            this.setState({owner : true});
          }
        }
      }
    }
  }

  onChange(e) {
    this.setState({input: e.target.value});
  }

  changeContent(e) {
    this.setState({content: e.target.value});
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

  submitContent(e) {
    e.preventDefault();
    const { name, address } = this.props;
    const contentObj = {
      content: this.state.content,
      time: Date(),
      name,
      address,
    };
    this.setState({content: ''});
    this.props.postContent(contentObj, this.props.match.params.id)
  }

  renderFanPage(badgeName) {
    const badge = this.props.badges[this.state.room];
    console.log(this.state.owner);

    return(
      <div className="fan-page">
        <Col lg={3}>
          <Navbar />
        </Col>
        <Row>
          <Col lg={10} lgOffset={1}>
            <Menu secondary>
              <img name={badgeName} src={cover} alt="banner" className="banner" />
              <div className="banner-text-container">
                <h2 className="group-name">{badge.name}</h2>
                <h3 className="badge-count">120 Badges Bought</h3>
              </div>
            </Menu>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <Dashboard />
                {
                  this.state.owner &&
                  <form>
                    <input type="text" value={this.state.content} onChange={this.changeContent} />
                    <button type="submit" onClick={this.submitContent}>
                      <img src={sendImg} alt="attach"/>
                    </button>
                  </form>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <ChatModal
                  input={this.state.input}
                  onChange={this.onChange}
                  onSubmit={this.onSubmit}
                  isOpen={this.state.modalOpen}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  room={this.state.room}
                />
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
    postContent
  }
)(FanPage);
