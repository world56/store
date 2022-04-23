import userHandle from "./user";
import systemHandel from "./system";
import dictionaryHandle from "./dictionary";
import { combineReducers } from "redux";

export default combineReducers({
  user: userHandle,
  system: systemHandel,
  dictionary: dictionaryHandle,
});
