import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import cheers from '../assets/cheers.png';
import './homepage.css';

/* eslint-disable react/no-multi-comp */
  class DesktopContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fixed: false,
      }
      this.homepageHeading = this.homepageHeading.bind(this);
    }
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    homepageHeading = () =>   (
    <Container text>
      <Header
        as='h1'
        content='The Beat'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
        }}
      />
      <Header
        as='h2'
        content='An Ujo Formation'
        inverted
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Link to="/pages" className="item">
        <Button size='huge' className="portal-button">
          See what's happening
          <Icon name='right arrow' />
        </Button>
      </Link>
    </Container>
  )
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ 'min-height': '700', padding: '1em 0em' }}
              vertical
              className="header-container"
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
                className="header-menu"
              >
                <Container>
                  <Menu.Item as='a' active>
                    Home
                  </Menu.Item>
                  <Link to="/pages" className="item">Fan Pages</Link>
                  <Menu.Item position='right'>
                    <a href="http://ujomusic.com/">
                    <Button as='a' inverted={!fixed}>
                      Discover Music on Ujo
                    </Button>
                    </a>
                  </Menu.Item>
                </Container>
              </Menu>
              {this.homepageHeading()}
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }

class HomePage extends React.Component {
  render = () => (
    <DesktopContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Connecting Artists and Fans like Never Before
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            The Beat is your home to connect with your favorite artists,
            where super-fans like yourself can be rewarded with exclusive content & deals,
            and can chat with people as passionate about music as they are. 
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
          </Divider>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Powered by Blockchain
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Built using Ujo Music's decentralized music registry, The Beat supports 
            unencumbered musicians who want full ownership of their releases. 
            Through smart-contracts on the Ethereum Blockchain, Ujo helps artists control
            their intellectual property without paying a cut to centralized distribution channels. 
          </p>
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          />
          <Header as='h3' style={{ fontSize: '2em' }}>
            Interested in Learning More? 
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Click the button below to check out Ujo Music, where you can buy the collectible badges
            that power this platform.
          </p>
          <Button size='huge' color="pink"><a style={{"text-decoration": "none", color: "white"}} href="www.ujomusic.com">Visit Ujo Music</a></Button>
        </Container>
      </Segment>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row centered>
              <Grid.Column width={4} />
              <Grid.Column width={8} textAlign="center">
                <p style={{margin: 'auto',}}>
                  Cheers <img src={cheers} style={{width: '20px'}}/> --&nbsp;Crystal Desai, Michelle Wu, and Pranav Pillai
                </p>
                <p>Summer 2018</p>
              </Grid.Column>
              <Grid.Column width={4}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </DesktopContainer>
  );
}
export default HomePage;
