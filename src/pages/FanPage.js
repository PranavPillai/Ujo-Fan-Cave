import React from 'react';
import visComp from 'ujo-style-guide';
import openSocket from 'socket.io-client';

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
  }

  componentDidMount() {
    socket.emit('subscribe', {room: this.props.match.params.id});
  }

  componentWillUnmount() {
    socket.emit('unsubscribe', {room: this.props.match.params.id});
  }

  onChange(e) {
    this.setState({input: e.target.value});
    socket.emit('message', {room: this.props.match.params.id, message: e.target.value});
  }

  render() {
    return (
      <div className="discover-page section section-page">
        <div className="container">
          <Row>
            <Col lg={10} lgOffset={1}>
              <Row className="section-header">
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h1 style={{position: 'absolute', left: '300px',}}>Discover</h1>
                  <form>
                    <input style={{position: 'absolute', left: '300px',}} type="text" value={this.state.input} onChange={this.onChange}/>
                  </form>
                  <div style={{position: 'absolute', left: '300px',}}>
                    {
                      this.state.messages.map((message) => {
                        return message;
                      })
                    }
                  </div>
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
