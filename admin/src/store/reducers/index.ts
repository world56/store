import userHandle from "./user";
import systemHandel from "./system";
import { combineReducers } from "redux";
import dictionaryHandle from "./dictionary";

export default combineReducers({
  user: userHandle,
  system: systemHandel,
  dictionaries: dictionaryHandle,
});
