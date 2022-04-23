import UserSagaForkRoot from "./user";
import SagaDictionaries from "./dictionary";
import { all, fork } from "redux-saga/effects";

export default function* SagaMiddleware() {
  yield all([fork(UserSagaForkRoot), fork(SagaDictionaries)]);
}
