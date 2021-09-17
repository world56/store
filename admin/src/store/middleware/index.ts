import UserSagaForkRoot from "./user";
import { all, fork } from "redux-saga/effects";

export default function* () {
  yield all([fork(UserSagaForkRoot)]);
}
