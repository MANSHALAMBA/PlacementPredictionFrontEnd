import { combineReducers } from "redux";

import auth from "./auth";
import quiz from "./quiz";
import project from "./project";
import dashboard from "./dashboard";

export default combineReducers({
  auth: auth,
  quiz: quiz,
  project: project,
  dashboard: dashboard
});
