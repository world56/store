import UserSagaForkRoot from "./user";
import { all, fork } from "redux-saga/effects";
import DictionariesSagaForkRoot from "./category";
export { default as ActionsMiddleware } from "./actions";

export default function* SagaMiddleware() {
  yield all([fork(UserSagaForkRoot), fork(DictionariesSagaForkRoot)]);
}
