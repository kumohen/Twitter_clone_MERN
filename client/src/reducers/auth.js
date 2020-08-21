const initialState = {
  isLoginin: false,
  followers: [],
  following: [],
  userP: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, login: action.payload, isLoginin: true };
    case "USER_AUTH":
      return { ...state, login: action.payload };
    case "USER_LOGOUT":
      return { ...state, isLoginin: false };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "USER_REGISTER":
      return {
        ...state,
        register: action.payload,
        isRegistation: true,
      };
    case "USER_PROFILE":
      return {
        ...state,
        userP: { ...state.userP, ...action.payload },
      };
    case "USER_PROPLE_CLEAR":
      return {
        ...state,
        userP: { ...state.userP, user: action.payload },
      };

    case "FOLLOW_PROFILE":
      return {
        ...state,
        userP: {
          ...state.userP,
          followers: [...state.followers, action.payload],
          following: [...state.following, action.payload],
        },
      };
    case "FIND_PROFILE":
      return {
        ...state,
        findUser: [...action.payload],
      };
    default:
      return state;
  }
}
