import { Action } from "redux";
import { login } from "@/api/user";
import * as USER_ACTION from "../action/user";
import { createBrowserHistory } from "history";
import { setUserInfo } from "../distributed/user";
import { takeEvery, put, call, fork } from "redux-saga/effects";

import * as UserType from "@/interface/user";
export interface UserAction extends Action<USER_ACTION.USER_LOGIN.USER_LOGIN> {
  params: UserType.Login.AccountSecret;
}

function* dispatchLogin(data: UserAction) {
  try {
    const { params } = data;
    const { res } = yield call(login, params);
    res.expires = params.expires;
    yield put(setUserInfo(res));
    createBrowserHistory().push("/");
  } catch (error) {
    console.log(error);
  }
}

function* userRoot() {
  yield takeEvery<UserAction>(USER_ACTION.USER_LOGIN.USER_LOGIN, dispatchLogin);
}

function* sagaRun() {
  yield fork(userRoot);
}

export default sagaRun;
