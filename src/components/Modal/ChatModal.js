import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMessage, clearMessages, setRoom } from '../../store/chat/actions';
import classNames from 'classnames';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

import ChatBox from '../ChatBox/ChatBox';
import './modal.css';

class ChatModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      room: this.props.room,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearMessages();
    this.props.setRoom(this.props.room);
  }

  componentDidUpdate() {
    const { room } = this.props;
    if(room !== this.state.room) {
      this.setState({ room });
      this.props.clearMessages();
      this.props.setRoom(room);
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
    this.props.sendMessage(messageObj, this.props.room);
  }

  render() {
    return (
      // <Modal trigger={<Button>Long Modal</Button>}>
      //   <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} />
      // </Modal>
      <div>
        <ChatBox input={this.state.input} onChange={this.onChange} onSubmit={this.onSubmit} />
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
