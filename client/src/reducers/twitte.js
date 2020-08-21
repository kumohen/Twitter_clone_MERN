import {
  CREATE_TWITTE,
  FETCH_TWITTES,
  PROFILE_TWEET,
  USER_TWEET,
  FETCH_TWEET,
} from "../actions/types";

const initialState = {
  twittes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_TWITTE:
      return {
        ...state,
        twittes: [...state.twittes, action.payload],
      };
    case FETCH_TWITTES:
      return { ...state, twitteList: action.payload };
    case PROFILE_TWEET:
      return { ...state, profileUser: action.payload };
    case USER_TWEET:
      return { ...state, userTweet: action.payload };
    case FETCH_TWEET:
      return { ...state, singleTweet: action.payload };
    default:
      return state;
  }
}
