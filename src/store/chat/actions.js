import { chatRef } from '../../config/firebase';
import {
  MESSAGE,
} from '../../constants/ActionTypes';

export const dispatchMessage = message => ({type: MESSAGE, message});

export const sendMessage = (message) => {
  chatRef.push().set(message);
  dispatchMessage(message);
};
