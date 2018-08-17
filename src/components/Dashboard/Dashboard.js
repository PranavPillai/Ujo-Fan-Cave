import React from 'react';
import visComp from 'ujo-style-guide';
import { connect } from 'react-redux';
import Content from './Content';
import './styles.css';
import { Button, Segment } from 'semantic-ui-react';

const Row = visComp.Row;
const Col = visComp.Col;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      currLength: this.props.contents.length,
      currIndex: Math.max(0, this.props.contents.length - 1),
    }
    this.increaseIndex = this.increaseIndex.bind(this);
    this.decreaseIndex = this.decreaseIndex.bind(this);
  }

  componentDidMount() {
    this.setState({open: this.props.open});
  }

  componentDidUpdate(props) {
    if(props.contents.length !== this.state.currLength) {
      this.setState({currLength: props.contents.length});
    }
  }

  increaseIndex() {
    this.setState({currIndex: Math.min(this.state.currLength - 1, this.state.currIndex + 1)});
  }

  decreaseIndex() {
    this.setState({currIndex: Math.max(0, this.state.currIndex - 1)});
  }

  render() {
    const {
      address,
    } = this.props;
    return(
      <div className="chat-box modal-content-container">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
          <Segment><div className="headers">
              <h1 className="exclusive-header">{this.props.badge.name}'s Board</h1>
              <h4 className="exclusive-subheader">Where your favorite artist can personally post exclusive music, performances, and merch!</h4>
            </div></Segment>
            <ul className="contents-container" ref="contentList">
              {this.props.contents.length > 0 && <Button className="nav-btn prev" disabled={this.state.currIndex === 0} onClick={this.decreaseIndex}>Prev</Button>}
              {
                this.props.contents.map((contentObj, i) => {
                  return <Content key={contentObj.time} content={contentObj} address={address} notHidden={this.state.currIndex === i}/>;
                })
              }
              {this.props.contents.length > 0 && <Button className="nav-btn next" disabled={this.state.currIndex === this.state.currLength-1} onClick={this.increaseIndex}>Next</Button>}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contents: state.dashboard.content,
    user: state.user.user,
    address: state.user.user.ethereumAddress,
  };
}

export default connect(mapStateToProps)(Dashboard);
