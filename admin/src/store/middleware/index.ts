import { Action } from "redux";
import { login } from "@/api/user";
import * as USER_ACTION from "../action/user";
import { createBrowserHistory } from "history";
import { setUserInfo } from "../distributed/user";
import { takeEvery, put, call, fork } from "redux-saga/effects";

import * as UserType from "@/interface/user";

export interface UserAction extends Action {
  type: USER_ACTION.USER_LOGIN.USER_LOGIN;
  params: UserType.Login.AccountSecret;
}

function* dispatchLogin(data: UserAction) {
  console.log("哈哈", data);
  try {
    const { params } = data;
    const { data: res } = yield call(login, params);
    res.expires = params.expires;
    yield put(setUserInfo(res));
    createBrowserHistory().push("/");
  } catch (e) {
    console.log(e);
  }
}

function* userRoot() {
  yield takeEvery<UserAction>(USER_ACTION.USER_LOGIN.USER_LOGIN, dispatchLogin);
}

function* sagaRun() {
  yield fork(userRoot);
}

export default sagaRun;
