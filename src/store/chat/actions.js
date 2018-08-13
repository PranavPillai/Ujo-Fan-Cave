import {
  MESSAGE,
} from '../../constants/ActionTypes';

export const sendMessage = message => ({type: MESSAGE, message});
