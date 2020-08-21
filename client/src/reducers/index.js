import { combineReducers } from "redux";
//import posts from './todos_reducers';

import auth from "./auth";
import twittes from "./twitte";

export default combineReducers({
  auth,
  twittes,
});
