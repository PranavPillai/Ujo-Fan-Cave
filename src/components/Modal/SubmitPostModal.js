import React from 'react'
import { connect } from 'react-redux';
import { postContent } from '../../store/dashboard/actions';
import { Modal } from 'react-bootstrap';
import PencilIcon from '../../assets/pencil-icon.png';
import { Form, Button } from 'semantic-ui-react';
import sendImg from '../../assets/send.png';
import './modal.css';

class SubmitPostModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      content: '',
      room: this.props.room,
    };
    this.submitContent = this.submitContent.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  changeContent(e) {
    this.setState({content: e.target.value});
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
    this.props.postContent(contentObj, this.props.room)
  }

  render() {
    return (
      <div className="modal-container">
      {(this.props.owner && <button bsStyle="primary" bsSize="large" onClick={this.handleShow} className="submit-modal-button">
          <img src={PencilIcon} alt="message button" className="modal-button-icon" />
        </button>)}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header className="header">
            <h2 className="header-text">Post For Your Fans!</h2>
            <Button className="exit-button" onClick={this.handleClose}>x</Button>
          </Modal.Header>
          <Modal.Body>
          <Form className="sendBar">
            <Form.Field className="input-container" onSubmit={this.submitContent}>
              <input className='inputBar' type="text" value={this.state.content} onChange={this.changeContent} />
              <Button basic color='pink' className='chatButton' type="submit" onClick={this.submitContent}>
                <img src={sendImg} alt="send"/>
              </Button>
            </Form.Field>
          </Form>
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
    postContent,
  }
)(SubmitPostModal);