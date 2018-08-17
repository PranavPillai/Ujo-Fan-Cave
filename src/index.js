import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import Web3Manager from './web3/Web3Manager';
import BadgeContracts from 'ujo-contracts-badges';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Web3Manager
        interval={100}
        badgeContract={BadgeContracts.UjoPatronageBadges}
      />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
