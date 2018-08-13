import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../store/chat/actions'

class Chat extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
         data: ''
      }
      this.updateState = this.updateState.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   };

   updateState(event) {
      this.setState({data: event.target.value});
      event.preventDefault();
   }

   handleSubmit(event) {
     alert('A name was submitted: ' + this.state.data);
     this.props.sendMessage(this.state.data)
     event.preventDefault();
   }

  render() {
    return(
      <div>
        <h1>Welcome to Chat Room!</h1>
        <form onSubmit={this.handleSubmit}>
          <input type = "text" value = {this.state.data} onChange = {this.updateState} />
          <input type="submit" value="Submit" />
        </form>
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
)(Chat);
