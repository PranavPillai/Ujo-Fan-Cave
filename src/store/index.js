import {createStore, combineReducers, applyMiddleware} from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { web3Reducer } from './web3';
import { chatReducer } from './chat';
import { userReducer } from './user';
import { dashboardReducer } from './dashboard';

export const reducer = combineReducers({
  web3: web3Reducer,
  chat: chatReducer,
  user: userReducer,
  dashboard: dashboardReducer
});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
