import {
  MESSAGE,
} from '../../constants/ActionTypes';

import { chatRef } from '../../config/firebase';

export const sendMessage = (message) => {
  chatRef.push().set(message);
  dispatchMessage(message);
};

export const dispatchMessage = message => ({type: MESSAGE, message});
