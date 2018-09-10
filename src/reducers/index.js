import { combineReducers } from 'redux';
import auth from './auth';
import money from './money';

export default combineReducers({
  auth,
  money,
});
