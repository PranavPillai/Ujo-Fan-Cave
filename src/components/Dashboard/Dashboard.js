import React from 'react';
import visComp from 'ujo-style-guide';
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import sendImg from '../../assets/send.png';
import Content from './Content';
import './styles.css';

const Row = visComp.Row;
const Col = visComp.Col;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    }
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
    this.setState({open: this.props.open});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.contentsEnd.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    const {
      input, onChange, onSubmit, address, onClick
    } = this.props;
    return(
      <div className="chat-box modal-content-container">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <ul className="contents" ref="contentList">
              {
                this.props.contents.map((contentObj) => {
                  return <Content key={contentObj.time} content={contentObj} address={address}/>;
                })
              }
              <li style={{float: 'left', clear: 'both', listStyle: 'none',}} ref={(el) => {this.contentsEnd = el; }}/>
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
