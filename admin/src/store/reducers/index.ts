import userHandle from "./user";
import systemHandel from "./system";
import { combineReducers } from "redux";

export default combineReducers({
  user: userHandle,
  system: systemHandel,
});
