import React from 'react'
import ChatBox from '../ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../../store/chat/actions';
import { Popover, Tooltip, Modal, OverlayTrigger, } from 'react-bootstrap';
import { Button, } from 'semantic-ui-react';
import MessageIcon from '../../assets/messaging-icon.png';
import './modal.css';

class ChatModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      input: '',
      room: this.props.room,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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
    this.props.sendMessage(messageObj, this.props.room);
  }

  render() {
    return (
      <div className="modal-container">
        <button bsStyle="primary" bsSize="large" onClick={this.handleShow} className="modal-button">
          <img src={MessageIcon} alt="message button" className="modal-button-icon" />
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="header">
            <h2 className="header-text">Community Chat</h2>
            <Button className="exit-button" onClick={this.handleClose}>x</Button>
          </Modal.Header>
          <Modal.Body>
            <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} open={this.state.show} />
          </Modal.Body>
        </Modal>
      </div>
    );
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
)(ChatModal);