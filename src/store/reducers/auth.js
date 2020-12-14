import { USER_LOGGED_IN, USER_LOGGED_OUT } from "store/actions/types/auth";

const initialState = {
  user: {},
  token: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        user: { ...action.payload.user },
        token: action.payload.token
      };
    case USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
