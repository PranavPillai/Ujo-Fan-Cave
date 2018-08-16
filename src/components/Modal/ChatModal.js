import React from 'react'
import ChatBox from '../ChatBox/ChatBox';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../../store/chat/actions';
import { Popover, Tooltip, Button, Modal, OverlayTrigger, } from 'react-bootstrap';
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
      <div>
        <p>Click to get the full Modal experience!</p>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose} className="modal">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
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