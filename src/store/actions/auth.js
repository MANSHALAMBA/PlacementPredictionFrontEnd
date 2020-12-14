import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types/auth";
import { USER_TOKEN, LOGGEDIN_USER } from "constants/storage/auth";

import { Storage } from "helpers";

export const onLogIn = (user, token) => async dispatch => {
  await Storage.save(USER_TOKEN, token);
  await Storage.saveJSON(LOGGEDIN_USER, user);
  dispatch(doLogInAction({ user, token }));
};

export const onLogOut = () => async dispatch => {
  await Storage.remove(USER_TOKEN);
  await Storage.remove(LOGGEDIN_USER);
  dispatch(doLogOutAction());
};

export const doLogInAction = payload => ({ type: USER_LOGGED_IN, payload });
export const doLogOutAction = () => ({ type: USER_LOGGED_OUT });
